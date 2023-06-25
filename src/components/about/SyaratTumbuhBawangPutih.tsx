const variabelSyaratTumbuh = [
  {
    modal: "my-modal-5",
    variabel: "Faktor yang Tidak Dapat Dikendalikan dan Dikoreksi",
  },
  { modal: "my-modal-6", variabel: "Faktor yang Efeknya Dapat Dikoreksi" },
  { modal: "my-modal-7", variabel: "Faktor yang Dapat Dikendalikan" },
];

export default function SyaratTumbuhBawangPutih() {
  return (
    <div>
      <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
        Syarat Tumbuh Bawang Putih
      </div>
      <div className="text-lg text-center text-black">
        <div className="mb-6">
          <p>
            Syarat tumbuh bawang putih yang dianalisis dikelompokan ke dalam
            tiga kategori yaitu
          </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          {variabelSyaratTumbuh.map(({ modal, variabel }, idx) => (
            <div
              className="card card-compact card-side w-80 bg-base-100 shadow-xl m-9"
              key={idx}
            >
              <div className="card-body">
                <h2 className="card-title font-bold mb-3 text-justify">
                  {variabel}
                </h2>
                <div className="card-actions justify-end">
                  <label htmlFor={modal} className="btn btn-accent">
                    Detail
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p>
          *Informasi diatas bersumber dari Balai Besar Sumberdaya Lahan
          Pertanian
        </p>
      </div>
    </div>
  );
}
