import React,{useState} from 'react'
import axios from 'axios'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/contact/send-email', formData);
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message.');
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center min-h-screen bg-gray-300 px-2'>
                <h1 className='italic text-2xl mt-20'>For any inquiries, please contact us</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 sm:p-8 mb-2 bg-white shadow-xl rounded-md mt-4 w-80 md:w-96'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name" className='font-medium'>Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name' className='border border-gray-400 p-1 px-2 rounded-md outline-none focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-medium'>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' className='border border-gray-400 p-1 px-2 rounded-md outline-none focus:shadow focus:border-blue-400 focus:shadow-blue-300' required />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="message" className='font-medium'>Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder='Enter your message' className='border border-gray-400 p-1 px-2 rounded-md outline-none focus:shadow focus:border-blue-400 focus:shadow-blue-300 h-28' required></textarea>
                    </div>
                    <button type="submit" className='bg-blue-500 font-medium text-xl text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow focus:shadow-blue-300 mt-6'>Send Message</button>

                </form>
            </div>
        </>
    )
}

export default Contact
