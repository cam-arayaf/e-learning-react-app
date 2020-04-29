import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { base_url, errorMessage } from './../constants';

export const CoursesContext = createContext();

const CoursesContextProvider = ({ children }) => {
	const { pathname } = useLocation();
	const body = document.querySelector('body');
	const selectedCoursesLS = JSON.parse(localStorage.getItem('selectedCourses')) || [];
	const [charged, setCharged] = useState(false);
	const [courses, setCourses] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState(selectedCoursesLS);
	const [total, setTotal] = useState(Number(localStorage.getItem('total')) || 0);
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState('');
	const [paid, setPaid] = useState(false);
	const [validUrl, setValidUrl] = useState(false);

	const getCourses = () => {
		fetch(`${ base_url }courses`)
			.then(res => res.json())
			.then(data => {
				setCharged(true);
				setCourses(data.courses);
			})
			.catch(() => setCharged(true));
	}

	const postOrder = courses => {
		setCharged(false);
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ courses })
		};
		fetch(`${ base_url }orders`, options)
			.then(res => res.json())
			.then(() => {
				localStorage.removeItem('selectedCourses');
				localStorage.removeItem('total');
				setSelectedCourses([]);
				setTotal(0);
				setCharged(true);
				setPaid(true);
				setMessage('Order paid successfully! Thank you very much for choosing us!');
			})
			.catch(() => {
				setCharged(true)
				setMessage(errorMessage);
			});
	}

	const getIndex = _id => selectedCourses.findIndex(sc => sc === _id);

	const handleButtonAddRemove = _id => {
		getIndex(_id) === -1 ? selectedCourses.push(_id) : selectedCourses.splice(getIndex(_id), 1);
		localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
		setSelectedCourses(JSON.parse(localStorage.getItem('selectedCourses')));
		const price = courses.find(c => c._id === _id).price;
		localStorage.setItem('total', getIndex(_id) === -1 ? (total - price).toFixed(2) : (total + price).toFixed(2));
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
			validUrl,
			errorMessage
        }}>
            { children }
        </CoursesContext.Provider>
    );
};

export default CoursesContextProvider;