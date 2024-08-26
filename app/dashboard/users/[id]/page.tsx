import { GetUserByIdAction } from '@/actions/user-auth';
import EditUserForm from '@/components/dashboard/users/edit-user-form';

const EditUser = async ({ params }: { params: any }) => {
  const user = await GetUserByIdAction(params.id);
  return (
    <div>
      <EditUserForm user={user} />
    </div>
  );
};

export default EditUser;
