import Image from 'next/image';
import user from '../../../../../public/images/user.svg';
import email from '../../../../../public/images/email.svg';
import phone from '../../../../../public/images/phone.svg';
import ChipStatus from '@/app/components/chip/ChipStatus';
import ButtonEditProfile from '@/app/components/buttons/ButtonEditProfile';
import ButtonInactiveProfile from '@/app/components/buttons/ButtonInactiveProfile';
import { getUserData } from '@/app/api/getUser';
import Breadcrumbs from '@/app/components/common/Breadcrumbs';

export default async function PerfilUsuario({
  params,
}: {
  params: { id: string };
}) {
  const userData = await getUserData();

  const userProfile = userData.data.find(
    (user: any) => user.id === Number(params.id)
  );

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div>
      <Breadcrumbs nameMapping={{ [params.id]: `Detalle usuario` }} />
      <div className='w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center'>
        <div className='w-1/5 flex flex-col'>
          <div>
            <Image src={user} width={83} height={83} alt='user-profile' />
          </div>
          <div>
            <ChipStatus status={userProfile.state} />
          </div>
        </div>
        <div className='w-2/5 flex flex-col'>
          <span className='text-xl font-semibold text-custom-blue'>
            {userProfile.name ?? '-'}
          </span>
          <span className='text-base text-custon-gray'>
            {userProfile.cargo ?? '-'}
          </span>
          <div className='flex flex-col mt-2'>
            <span className='text-base text-custon-gray'>
              {userProfile.taxID ?? '-'}
            </span>
            <span className='text-base text-custon-gray'>
              {userProfile.region ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col'>
          <div className='flex items-center'>
            <Image src={phone} width={40} height={40} alt='telefono' />
            <span className='text-base text-custon-gray'>
              {userProfile.phone ?? '-'}
            </span>
          </div>
          <div className='flex items-center'>
            <Image src={email} width={40} height={40} alt='telefono' />
            <span className='text-base text-custon-gray'>
              {userProfile.email ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-2 items-center'>
          <div>
            <ButtonEditProfile
              type='user'
              id={params.id}
              byIdURL={'/UserApi/GetUsers'}
            />
          </div>
          <div>
            <ButtonInactiveProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
