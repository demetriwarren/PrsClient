export function ProductCreatePage() {
  return (
    <>
      <section className="container ps-5 pt-4">
        <h2>New Product</h2>
        <hr />
        <form className="container-fluid d-flex row ">
          <div>
            <label htmlFor="vendorCode">Vendor Code</label>
            <input type="text" className="form-control is-invalid w-25" />
            <label htmlFor="vendorName">Vendor Name</label>
            <input type="text" className="form-control is-invalid w-75" />
          </div>
          <br />
          <div>
            <label htmlFor="vendorAddress">Address</label>
            <input type="text" className="form-control is-invalid" />
          </div>
          <div>
            <label htmlFor="vendorCity">City</label>
            <input type="text" className="form-control is-invalid" />
            <label htmlFor="vendorState">State</label>
            <input type="text" className="form-control is-invalid" />
            <label htmlFor="vendorZip">Zip Code</label>
            <input type="text" className="form-control is-invalid" />
          </div>
        </form>
      </section>
    </>
  );
}
