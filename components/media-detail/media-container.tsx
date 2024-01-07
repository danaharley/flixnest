export type MediaContainerProps = {
  children: React.ReactNode;
  title: string;
};

export const MediaContainer = ({ children, title }: MediaContainerProps) => {
  return (
    <div className="space-y-6">
      <h2 className="ml-4 text-2xl font-bold uppercase">{title}</h2>
      {children}
    </div>
  );
};
