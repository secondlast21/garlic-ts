export default function CardSyaratTumbuh() {
    return (
        <>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" /><div className="modal">
            <div className="modal-box text-justify">
                <h3 className="font-bold text-lg">Faktor yang tidak dapat dikendalikan dan dikoreksi yang terdiri dari :</h3>
                   <p className="py-4">
                        a. Faktor cuaca <br />
                        &emsp;&emsp;i. Temperatur (c), rata-rata (per bulan){" "}
                        <br />
                        &emsp;&emsp;ii. Curah Hujan (mm), (total per bulan){" "}
                        <br />
                        &emsp;&emsp;iii. Lama Penyinaran <br />
                        &emsp;&emsp;iv. Radiasi Penyinaran <br />
                        b. Faktor relief <br />
                        &emsp;&emsp;i. Elevasi (magl) <br />
                        &emsp;&emsp;ii. Relief(%) <br></br>
                   </p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-5" className="btn btn-error">Tutup</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal-6" className="modal-toggle" /><div className="modal">
            <div className="modal-box text-justify">
                <h3 className="font-bold text-lg">Faktor yang efeknya dapat dikoreksi, yang terdiri dari :</h3>
                   <p className="py-4">
                        a. Kejenuhan Basa (%) <br />
                        b. Kedalaman Mineral Tanah (cm) <br />
                        c. Kemasaman Tanah (pH)
                   </p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn btn-error">Tutup</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal-7" className="modal-toggle" /><div className="modal">
            <div className="modal-box text-justify">
                <h3 className="font-bold text-lg">Faktor yang dapat dikendalikan, yang terdiri dari :</h3>
                   <p className="py-4">
                        a. Drainase <br />
                        b. Kapasitas Tukar Kation (cmol) <br />
                        c. Tekstur Tanah
                   </p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-7" className="btn btn-error">Tutup</label>
                    </div>
                </div>
            </div>
        </>
    )
}