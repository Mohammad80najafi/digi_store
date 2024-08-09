'use client';

const LastUsers = ({ users }: any) => {
  const userList = [];
  for (let i = 0; i < 4; i++) {
    userList.push(
      <li className='text-xl text-black' key={i}>
        {users[i].name}
      </li>,
    );
  }

  return (
    <ul className='flex flex-col flex-wrap items-start gap-2'>{userList}</ul>
  );
};

export default LastUsers;
