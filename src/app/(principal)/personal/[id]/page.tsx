import Image from "next/image";
import user from "../../../../../public/images/user.svg";
import email from "../../../../../public/images/email.svg";
import phone from "../../../../../public/images/phone.svg";
import ChipStatus from "@/app/components/chip/ChipStatus";
import ButtonEditProfile from "@/app/components/buttons/ButtonEditProfile";
import ButtonInactiveProfile from "@/app/components/buttons/ButtonInactiveProfile";
import { getUserData } from "@/app/api/data";
export default async function PerfilPersonal({
  params,
}: {
  params: { id: string };
}) {
  const personalData = await getUserData();

  const personalProfile = personalData.data.find(
    (personal: any) => personal.id === Number(params.id)
  );

  if (!personalProfile) {
    return <div>Personal no encontrado</div>;
  }

  return (
    <div className="w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center">
      <div className="w-1/5 flex flex-col">
        <div>
          <Image src={user} width={83} height={83} alt="user-profile" />
        </div>
        <div>
          <ChipStatus status={personalProfile.state ?? "Activo"}>
            {personalProfile.state ?? "Activo"}
          </ChipStatus>
        </div>
      </div>
      <div className="w-2/5 flex flex-col">
        <span className="text-xl font-semibold text-custom-blue">
          {personalProfile.name ?? "-"}
        </span>
        <span className="text-base text-custon-gray">
          {personalProfile.cargo ?? "-"}
        </span>
        <div className="flex flex-col mt-2">
          <span className="text-base text-custon-gray">
            {personalProfile.taxID ?? "-"}
          </span>
          <span className="text-base text-custon-gray">
            {personalProfile.region ?? "-"}
          </span>
        </div>
      </div>
      <div className="w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col">
        <div className="flex items-center">
          <Image src={phone} width={40} height={40} alt="telefono" />
          <span className="text-base text-custon-gray">
            {personalProfile.phone ?? "-"}
          </span>
        </div>
        <div className="flex items-center">
          <Image src={email} width={40} height={40} alt="telefono" />
          <span className="text-base text-custon-gray">
            {personalProfile.email ?? "-"}
          </span>
        </div>
      </div>
      <div className="w-1/5 flex flex-col gap-2 items-center">
        <div>
          <ButtonEditProfile />
        </div>
        <div>
          <ButtonInactiveProfile />
        </div>
      </div>
    </div>
  );
}
