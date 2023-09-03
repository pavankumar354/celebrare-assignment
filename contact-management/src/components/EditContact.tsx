import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../redux/hooks.ts';
import { editContact } from '../redux/contactsSlice.ts';
import ContactsType from '../utils/ContactsType';
import { useParams,useNavigate } from 'react-router-dom';

const EditContact: React.FC = () => {
  const {id} = useParams<{id: string}>();
  let urlId=0;
  if (id) {
    const nid =parseInt(id, 10);
    urlId = nid;
  }
  const contact = useAppSelector<ContactsType | undefined>(store =>
    store.contacts.contactsList.find(
      (contact, index) => index === urlId
    )
  );

  const { firstname = '', lastname = '', status = '' } = contact ?? {};
  const { register, handleSubmit, formState:{errors}, setValue } = useForm<ContactsType>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValue('firstname', firstname);
    setValue('lastname', lastname);
    setValue('status', status);
  },[firstname, lastname, status]);
  
  const submitHandler:SubmitHandler<ContactsType> = (updatedContact) => {
    dispatch(editContact({urlId, updatedContact}));
    navigate('/');
  };
  return (
    <div className='h-screen w-full flex justify-center text-yellow-300 bg-black bg-opacity-95'>
      <div className='p-6 w-1/2 mt-8'>
        <h1 className='font-extrabold text-center text-2xl mb-4'>Enter Contact Details</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor='Frist Name'>First Name:</label>
          <input className='mb-3 border-2  border-yellow-700 bg-yellow-100 rounded-lg pl-4 py-2 placeholder:text-yellow-700 text-yellow-700' placeholder='First Name' {...register('firstname', { required: true })} />
          {errors.firstname && <span>Firstname Required</span>}
          <label htmlFor='Last Name'>First Name:</label>
          <input className='mb-3 border-2  border-yellow-700 bg-yellow-100 rounded-lg pl-4 py-2 placeholder:text-yellow-700 text-yellow-700' placeholder='Last Name' {...register('lastname', { required: true })} />
          {errors.lastname && <span>Firstname Required</span>}
          <label htmlFor='status'>Status:</label>
          <select className='border border-yellow-700 bg-yellow-100 rounded-lg py-2 pl-4 text-yellow-700 mb-3' {...register('status', { required:true })}>
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
          {errors.status && <span>Feild required!</span>}
          <button type='submit' className='border-2 border-yellow-700 bg-yellow-400 text-black font-medium rounded-xl py-2 mt-3'>Submit</button>
        </form>
      </div>    
    </div>
  );
};

export default EditContact;