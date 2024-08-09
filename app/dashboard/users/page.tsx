import { auth } from '@/auth';
import { GetAllUsersAction } from '@/actions/user-auth';
import UsersList from '@/components/dashboard/users/users-list';
import RegisterUserForm from '@/components/dashboard/users/register-form';

const Users = async () => {
  const session = await auth();
  const users = await GetAllUsersAction();

  return (
    <div className='min-w-screen'>
      <div>
        <RegisterUserForm />
      </div>
      <div className=''>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default Users;
