export default function Header({ title, description, imgURL }) {
  return (
    <>
      <header className="  bg-success m-3 rounded-4">
        <div className=" container-fluid">
          <div className="row ">
            <div className="col-md-8 text-white ">
              <div className=" h-100 d-flex  flex-column justify-content-center p-2">
                <h1>{title}</h1>
                <p>{description}</p>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="h-100 text-end">
                <img src={imgURL} alt="" className="w-75" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
