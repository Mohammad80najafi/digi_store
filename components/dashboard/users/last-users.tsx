import { GetLastUsersAction } from '@/actions/user-auth';

const LastUsers = async () => {
  const users = await GetLastUsersAction();

  return (
    <div className='flex items-center justify-center'>
      <div className='overflow-x-auto'>
        <div className='inline-block min-w-full p-1.5 align-middle'>
          <div className='overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    نام کاربری
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    ایمیل
                  </th>

                  <th
                    scope='col'
                    className='px-6 py-3 text-start text-lg font-medium uppercase text-gray-500 dark:text-white'
                  >
                    نقش{' '}
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {users?.map((user: any) => (
                  <tr key={user?.id}>
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-white'>
                      {user?.name}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
                      {user?.email}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-white'>
                      {user?.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastUsers;
