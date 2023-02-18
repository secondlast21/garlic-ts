const detail = [
    { title: 'Kelas S1 - Sangat Sesuai', modal: 'my-modal-1', keterangan: 'Lahan tidak mempunyai faktor pembatas yang berarti atau nyata terhadap penggunaan secara berkelanjutan, atau faktor pembatas yang bersifat minor dan tidak akan mereduksi produktivitas lahan secara nyata.' },
    { title: 'Kelas S2 - Cukup Sesuai', modal: 'my-modal-2', keterangan: 'Lahan mempunyai faktor pembatas, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan (input). Pembatas tersebut biasanya dapat diatasi oleh petani sendiri.' },
    { title: 'Kelas S3 - Sesuai Marginal', modal: 'my-modal-3', keterangan: 'Lahan mempunyai faktor pembatas yang berat, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan yang lebih banyak daripada lahan yang tergolong S2. Untuk mengatasi faktor pembatas pada S3 memerlukan modal tinggi, sehingga perlu adanya bantuan atau campur tangan (intervensi) pemerintah atau pihak swasta. Tanpa bantuan tersebut petani tidak mampu mengatasinya.' },
    { title: 'Kelas N - Tidak Sesuai', modal: 'my-modal-4', keterangan: 'Lahan yang tidak sesuai (N) karena mempunyai faktor pembatas yang sangat berat dan/atau sulit diatasi.' },
]

export default function CardKesesuaianLahan() {
    return (
        <>
            {detail.map(({ title, modal, keterangan }, idx) => (
                <div key={idx}>
                    <input type="checkbox" id={modal} className="modal-toggle" /><div className="modal">
                        <div className="modal-box text-justify">
                            <h3 className="font-bold text-lg">{title}</h3>
                            <p className="py-4">{keterangan}</p>
                            <div className="modal-action">
                                <label htmlFor={modal} className="btn btn-error">Tutup</label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}