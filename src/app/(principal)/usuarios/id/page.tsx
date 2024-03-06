import Image from "next/image";
import user from "../../../../../public/images/user.svg";
import email from "../../../../../public/images/email.svg";
import phone from "../../../../../public/images/phone.svg";
import ChipStatus from "@/components/chip/ChipStatus";
import ButtonEditProfile from "@/components/buttons/ButtonEditProfile";
import ButtonInactiveProfile from "@/components/buttons/ButtonInactiveProfile";
export default function PerfilUsuario() {
  return (
    <div className="w-full mt-10 py-6 px-8 bg-white rounded-lg flex items-center">
      <div className="w-1/5 flex flex-col">
        <div>
          <Image src={user} width={83} height={83} alt="user-profile" />
        </div>
        <div>
          <ChipStatus status="Activo">Activo</ChipStatus>
        </div>
      </div>
      <div className="w-2/5 flex flex-col">
        <span className="text-xl font-semibold text-custom-blue">
          Jose Manuel Retamal Hill
        </span>
        <span className="text-base text-custon-gray">
          Ingeniero en Construcción
        </span>
        <div className="flex flex-col mt-2">
          <span className="text-base text-custon-gray">9.485.785-7</span>
          <span className="text-base text-custon-gray">Antofagasta</span>
        </div>
      </div>
      <div className="w-1/2 flex justify-start items-start 2xl:w-1/5 flex-col">
        <div className="flex items-center">
          <Image src={phone} width={40} height={40} alt="telefono" />
          <span className="text-base text-custon-gray">+56 9 835158574</span>
        </div>
        <div className="flex items-center">
          <Image src={email} width={40} height={40} alt="telefono" />
          <span className="text-base text-custon-gray">
            contacto@eicingenieria.cl
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
