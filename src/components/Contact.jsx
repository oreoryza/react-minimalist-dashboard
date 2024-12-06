import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts } from '../redux/async/restSlice'

const Contact = () => {
    const dispatch = useDispatch()
    const {contacts} = useSelector(state => state.rest)

    useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

  return (
    <div>
        <h1 className="text-4xl font-bold">Contact</h1>
        <div className='my-8'>
            <table className='w-full'>
                <thead>
                    <tr className='border-b-2 border-black'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item, index) => (
                        <tr key={index} className='border-y border-black hover:bg-black/[.1]'>
                            <td className='py-4'>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.website}</td>
                            <td>{item.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Contact