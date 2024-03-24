interface SuccessPanelProps {
  successMessage: string;
}

export default function SuccessPanel({ successMessage }: SuccessPanelProps) {
  return (
    <>
      {successMessage && (
        <div className='alert alert-success mt-3' role='alert'>
          {successMessage}
        </div>
      )}
    </>
  );
}
