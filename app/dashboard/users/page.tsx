import { auth } from '@/auth';
import { GetAllUsersAction } from '@/actions/user-auth';
import UsersList from '@/components/dashboard/users/users-list';
import RegisterUserForm from '@/components/dashboard/users/register-form';

const Users = async () => {
  const session = await auth();
  const users = await GetAllUsersAction();

  return (
    <div className='grid w-[100%] grid-cols-1 gap-4 lg:grid-cols-12'>
      <div className='w-[100%] place-items-center lg:col-span-4'>
        <RegisterUserForm />
      </div>
      <div className='flex w-full items-center justify-center overflow-x-scroll md:overflow-hidden lg:col-span-8'>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default Users;
