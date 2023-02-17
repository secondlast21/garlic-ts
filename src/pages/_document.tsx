import { Html, Head, Main, NextScript } from 'next/document'

const detail = [
  { modal: 'my-modal-1', keterangan: 'Lahan tidak mempunyai faktor pembatas yang berarti atau nyata terhadap penggunaan secara berkelanjutan, atau faktor pembatas yang bersifat minor dan tidak akan mereduksi produktivitas lahan secara nyata' },
  { modal: 'my-modal-2', keterangan: 'Lahan mempunyai faktor pembatas, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan (input). Pembatas tersebut biasanya dapat diatasi oleh petani sendiri' },
  { modal: 'my-modal-3', keterangan: 'Lahan mempunyai faktor pembatas yang berat, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan yang lebih banyak daripada lahan yang tergolong S2. Untuk mengatasi faktor pembatas pada S3 memerlukan modal tinggi, sehingga perlu adanya bantuan atau campur tangan (intervensi) pemerintah atau pihak swasta. Tanpa bantuan tersebut petani tidak mampu mengatasinya' },
  { modal: 'my-modal-4', keterangan: 'Lahan yang tidak sesuai (N) karena mempunyai faktor pembatas yang sangat berat dan/atau sulit diatasi' },
]

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <input type="checkbox" id="my-modal-1" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box text-justify">
            <h3 className="font-bold text-lg">Kelas S1</h3>
            <p className="py-4">Lahan tidak mempunyai faktor pembatas yang berarti atau nyata terhadap penggunaan secara berkelanjutan, atau faktor pembatas yang bersifat minor dan tidak akan mereduksi produktivitas lahan secara nyata</p>
            <div className="modal-action">
              <label htmlFor="my-modal-1" className="btn btn-error">Tutup</label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="my-modal-2" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box text-justify">
            <h3 className="font-bold text-lg">Kelas S2</h3>
            <p className="py-4">Lahan mempunyai faktor pembatas, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan (input). Pembatas tersebut biasanya dapat diatasi oleh petani sendiri</p>
            <div className="modal-action">
              <label htmlFor="my-modal-2" className="btn btn-error">Tutup</label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box text-justify">
            <h3 className="font-bold text-lg">Kelas S3</h3>
            <p className="py-4">Lahan mempunyai faktor pembatas yang berat, dan faktor pembatas ini akan berpengaruh terhadap produktivitasnya, memerlukan tambahan masukan yang lebih banyak daripada lahan yang tergolong S2. Untuk mengatasi faktor pembatas pada S3 memerlukan modal tinggi, sehingga perlu adanya bantuan atau campur tangan (intervensi) pemerintah atau pihak swasta. Tanpa bantuan tersebut petani tidak mampu mengatasinya</p>
            <div className="modal-action">
              <label htmlFor="my-modal-3" className="btn btn-error">Tutup</label>
            </div>
          </div>
        </div>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box text-justify">
            <h3 className="font-bold text-lg">Kelas N</h3>
            <p className="py-4">Lahan yang tidak sesuai (N) karena mempunyai faktor pembatas yang sangat berat dan/atau sulit diatasi</p>
            <div className="modal-action">
              <label htmlFor="my-modal-4" className="btn btn-error">Tutup</label>
            </div>
          </div>
        </div>
      </body>
    </Html>
  )
}
