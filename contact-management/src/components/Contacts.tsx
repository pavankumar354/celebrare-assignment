import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useQuery,
} from '@tanstack/react-query';
import { useAppSelector, useAppDispatch } from '../redux/hooks.ts';
import { deleteContact } from '../redux/contactsSlice.ts';
import"./contact.css"
const Contacts: React.FC = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(store => store.contacts.contactsList);
  //const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['contacts'], queryFn: ()=> contacts });
  if (query.isLoading) {
    return (
      <div className='h-screen w-full flex align-middle justify-center bg-black text-white font-black bg-opacity-95'>
        <h1>loading...</h1>   
      </div>
    );
  }

  const handleDelete = async (index:number) => {
    await dispatch(deleteContact(index));
    query.refetch();
  };

  return (
    <div className=' contact3  min-h-screen w-full flex justify-center bg-black bg-opacity-95'>
      <div className=' contact1 p-6 w-full flex flex-col justify-start items-center'>
        <button onClick={()=>{navigate('/contacts/new');}} className=' buttons border-[3px] border-yellow-700 bg-yellow-400 rounded-2xl text-black font-medium px-2 py-1 my-6 w-40 '>Create Contact</button>
        { 
          query.data?.length === 0 ? 
            (
              <div className=' contact text-yellow-700 border-[5px] border-dotted border-yellow-700 rounded-2xl flex flex-row text-center p-5 m-6 w-1/2 md:w-3/4 sm:w-full max-[600px]:w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" height='240' width='240' viewBox="0 0 34.52 34.52" id="cross"><g data-name="Layer 2" fill="#a16207" className="color000000 svgShape"><g data-name="Layer 1" fill="#a16207" className="color000000 svgShape"><path d="M21.51,23.44a1.46,1.46,0,0,1-1-.43L17.26,19.8,14.05,23A1.48,1.48,0,0,1,12,23l-.45-.45a1.47,1.47,0,0,1,0-2.09l3.21-3.21-3.21-3.21a1.47,1.47,0,0,1,0-2.09l.45-.45a1.48,1.48,0,0,1,2.09,0l3.21,3.21,3.21-3.21a1.48,1.48,0,0,1,2.09,0L23,12a1.47,1.47,0,0,1,0,2.09l-3.2,3.21L23,20.47a1.47,1.47,0,0,1,0,2.09l-.44.45A1.47,1.47,0,0,1,21.51,23.44Z" fill="#a16207" className="color000000 svgShape"></path><path d="M17.26,34.52A17.26,17.26,0,1,1,34.52,17.26,17.28,17.28,0,0,1,17.26,34.52Zm0-31.07A13.81,13.81,0,1,0,31.07,17.26,13.83,13.83,0,0,0,17.26,3.45Z" fill="#a16207" className="color000000 svgShape"></path></g></g></svg>
                <div className='text-left font-medium text-lg flex flex-col justify-center p-8'>
                  <p>No Contact Found.</p>
                  <p>Please add contact from</p>
                  <p>Create Contact Button</p>   
                </div>
              </div>
            ) 
            : 
            (
              <div className=' contact2 flex flex-wrap justify-center w-full'>
                {query.data?.map((res, index) => {
                  const {firstname, lastname, status} = res;
                  return (
                    <div className='cont text-yellow-700 border-2 font-semibold text-lg bg-yellow-300 border-yellow-700 rounded-2xl flex flex-col text-left p-5 m-6' key={index}>
                      <p key={firstname}>First Name: {firstname}</p>
                      <p key={lastname}>Last Name: {lastname}</p>
                      <p key={status}>Status: {status}</p>
                      <div className='flex flex-row justify-between'>
                        <button className='border-2 rounded-lg text-yellow-600 border-yellow-600 bg-yellow-200 p-1.5 font-semibold mt-3' onClick={() => navigate(`/contacts/${index}`)}>Edit</button>
                        <button className='border-2 rounded-lg text-black bg-red-600 border-red-900 p-1.5 mt-3 font-semibold' onClick={() => handleDelete(index)}>Delete</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
        }
      </div>    
    </div>
  );
};

export default Contacts;