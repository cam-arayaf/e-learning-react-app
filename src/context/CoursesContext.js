import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { validateSelectedCourses, validateTotal } from './../helpers';
import { base_url } from './../constants';

export const CoursesContext = createContext();

const CoursesContextProvider = ({ children }) => {
	const { pathname } = useLocation();
	const body = document.querySelector('body');
	const errorMessage = 'Internal server error. Please, try again';
	const [charged, setCharged] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [courses, setCourses] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState(validateSelectedCourses() || []);
	const [total, setTotal] = useState(validateTotal() || 0);
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState('');
	const [paid, setPaid] = useState(false);
	const [validUrl, setValidUrl] = useState(false);

	const getCourses = () => {
		fetch(`${ base_url }courses`)
			.then(res => res.json())
			.then(data => {
				data.ok ? setCourses(data.courses) : setMessage(errorMessage);
				setCharged(true);
			})
			.catch(() => {
				setMessage(errorMessage);
				setCharged(true);
			});
	}

	const postOrder = courses => {
		setProcessing(true);
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ courses })
		};
		fetch(`${ base_url }orders`, options)
			.then(res => res.json())
			.then(data => {
				data.ok ? successFetchOrder() : setMessage(errorMessage);
				setProcessing(false);
			})
			.catch(() => {
				setMessage(errorMessage);
				setProcessing(false);
			});
	}

	const successFetchOrder = () => {
		localStorage.removeItem('selectedCourses');
		localStorage.removeItem('total');
		setSelectedCourses([]);
		setTotal(0);
		setMessage('Order paid successfully! Thank you very much for choosing us!');
		setPaid(true);
	}

	const getIndex = _id => selectedCourses.findIndex(sc => sc === _id);

	const totalPrice = (_id, price = courses.find(c => c._id === _id).price) =>
		getIndex(_id) === -1 ? (total - price).toFixed(2) : (total + price).toFixed(2);

	const handleButtonAddRemove = _id => {
		getIndex(_id) === -1 ? selectedCourses.push(_id) : selectedCourses.splice(getIndex(_id), 1);
		localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
		setSelectedCourses(JSON.parse(localStorage.getItem('selectedCourses')));
		localStorage.setItem('total', totalPrice(_id));
		setTotal(Number(localStorage.getItem('total')));
	}

	const openModal = () => {
		body.style.overflow = 'hidden';
		setMessage('Are you sure you want to pay?');
		setShowModal(true);
	}

	const closeModal = () => {
		setPaid(false);
		body.removeAttribute('style');
		setShowModal(false);
	}

	useEffect(() => {
		if (pathname !== '/') return setValidUrl(false);
		setValidUrl(true);
		getCourses();
	}, [pathname]);

    return (
        <CoursesContext.Provider value={{
			charged,
			processing,
            selectedCourses,
            courses,
            handleButtonAddRemove,
			getIndex,
			total,
			showModal,
			openModal,
			closeModal,
			postOrder,
			message,
			paid,
			validUrl
        }}>
            { children }
        </CoursesContext.Provider>
    );
};

CoursesContextProvider.displayName = 'CoursesContextProvider';

export default CoursesContextProvider;