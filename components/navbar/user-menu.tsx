import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserMenu = () => {
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage
        src="https://res.cloudinary.com/nubicoder/image/upload/q_auto,f_auto,w_300,h_300,c_thumb,g_faces,z_0.75/v1692811821/danaharley/dana.jpg"
        alt="dana"
      />
      <AvatarFallback>DN</AvatarFallback>
    </Avatar>
  );
};
