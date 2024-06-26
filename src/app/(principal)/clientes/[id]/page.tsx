import Image from 'next/image';
import user from '../../../../../public/images/user.svg';
import email from '../../../../../public/images/email.svg';
import phone from '../../../../../public/images/phone.svg';
import ChipStatus from '@/app/components/chip/ChipStatus';
import ButtonEditProfile from '@/app/components/buttons/ButtonEditProfile';
import ButtonInactiveProfile from '@/app/components/buttons/ButtonInactiveProfile';
import BaseTableCard from '@/app/components/tables/table/BaseTableCard';
import ClientProyectTable from '@/app/components/tables/clientTable/ClientProyectTable';
import { formatTaxId } from '@/helpers/capitaliizeFirstLetter';
import { getClientData } from '@/app/api/getUser';
import Breadcrumbs from '@/app/components/common/Breadcrumbs';
export default async function PerfilClient({
  params,
}: {
  params: { id: string };
}) {
  const clientData = await getClientData();

  const clientProfile = clientData.data.find(
    (client: any) => client.id === Number(params.id)
  );

  if (!clientProfile) {
    return <div>Personal no encontrado</div>;
  }

  return (
    <div>
      <Breadcrumbs nameMapping={{ [params.id]: `Detalle cliente` }} />

      <div className='w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center'>
        <div className='w-1/5 flex flex-col'>
          <div>
            <Image src={user} width={83} height={83} alt='user-profile' />
          </div>
          <div>
            <ChipStatus status={clientProfile.state ?? 'Activo'} />
          </div>
        </div>
        <div className='w-2/5 flex flex-col'>
          <span className='text-xl font-semibold text-custom-blue'>
            {clientProfile.name ?? '-'}
          </span>
          <div className='flex flex-col mt-2'>
            <span className='text-base text-custon-gray'>
              {formatTaxId(clientProfile.taxId) ?? '-'}
            </span>
            <span className='text-base text-custon-gray'>
              {clientProfile.address ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col'>
          <div className='flex items-center'>
            <Image src={phone} width={40} height={40} alt='telefono' />
            <span className='text-base text-custon-gray'>
              {clientProfile.phone ?? '-'}
            </span>
          </div>
          <div className='flex items-center'>
            <Image src={email} width={40} height={40} alt='telefono' />
            <span className='text-base text-custon-gray'>
              {clientProfile.email ?? '-'}
            </span>
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-2 items-center'>
          <div>
            <ButtonEditProfile
              id={params.id}
              byIdURL='/ClientApi/GetClients'
              type='client'
              hasIdentifier
            />
          </div>
          <div>
            <ButtonInactiveProfile />
          </div>
        </div>
        <div className='w-1/5 flex flex-col gap-2 items-center'></div>
      </div>
      <div className={`h-[600px] overflow-y-auto mt-10`}>
        <BaseTableCard>
          <ClientProyectTable proyectData={clientProfile.data} />
        </BaseTableCard>
      </div>
    </div>
  );
}
