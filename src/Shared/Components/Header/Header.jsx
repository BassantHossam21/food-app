export default function Header({ title, description, imgURL }) {
  return (
    <>
      <header className="header-bg m-3 rounded-4">
        <div className="container-fluid">
          <div className="row align-items-center px-4 py-3">
            <div className="col-md-9 text-white text-center text-md-start">
              <div>
                <h1 className="fw-bold">{title}</h1>
                <p className="opacity-75 mb-0">{description}</p>
              </div>
            </div>
            <div className="col-md-3 text-center text-md-end mt-3 mt-md-0">
              <img src={imgURL} alt="Header Illustration" className="img-fluid w-75" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
