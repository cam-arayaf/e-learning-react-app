import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { validateSelectedCourses, validateTotal } from './../helpers';
import { body, errorMessage, base_url } from './../constants';

export const ELearningContext = createContext();

const ELearningContextProvider = ({ children }) => {
	const { pathname } = useLocation();
	const [charged, setCharged] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [courses, setCourses] = useState([]);
	const [selectedCourses, setSelectedCourses] = useState(validateSelectedCourses() || []);
	const [total, setTotal] = useState(validateTotal() || 0);
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState('');
	const [paid, setPaid] = useState(false);
	const [validUrl, setValidUrl] = useState(false);
	const [effect, setEffect] = useState('');
	const [modifyCart, setModifyCart] = useState(false);

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
		setModifyCart(true);
		setTimeout(() => setModifyCart(false), 300);
	}

	const openModal = () => {
		body.style.overflow = 'hidden';
		setEffect('show');
		setMessage('Are you sure you want to pay?');
		setShowModal(true);
	}

	const closeModal = () => {
		setEffect('close');
		setTimeout(() => {
			body.removeAttribute('style');
			setPaid(false);
			setShowModal(false);
		}, 300);
	}

	useEffect(() => {
		if (pathname !== '/') return setValidUrl(false);
		setValidUrl(true);
		getCourses();
	}, [pathname]);

    return (
        <ELearningContext.Provider value={{
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
			validUrl,
			effect,
			modifyCart
        }}>
            { children }
        </ELearningContext.Provider>
    );
};

ELearningContextProvider.displayName = 'ELearningContextProvider';

export default ELearningContextProvider;