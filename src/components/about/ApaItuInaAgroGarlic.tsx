const kesesuaianLahan = [
  {
    kelas: 'Kelas S1',
    title: 'Lahan sangat sesuai untuk penanaman bawang putih',
    atribut: 'w-72 h-52 bg-s1',
    modal: 'my-modal-1',
  },
  {
    kelas: 'Kelas S2',
    title: 'Lahan cukup sesuai untuk penanaman bawang putih',
    atribut: 'w-72 h-52 bg-s2',
    modal: 'my-modal-2',
  },
  {
    kelas: 'Kelas S3',
    title: 'Lahan hampir tidak sesuai untuk penanaman bawang putih',
    atribut: 'w-72 h-52 bg-s3',
    modal: 'my-modal-3',
  },
  {
    kelas: 'Kelas N',
    title: 'Lahan tidak sesuai untuk penanaman bawang putih',
    atribut: 'w-72 h-52 bg-n',
    modal: 'my-modal-4',
  },
  {
    kelas: 'BL',
    title: 'Lahan belum memiliki kelas kesesuaian lahan',
    atribut: 'w-72 h-52 bg-bl',
    modal: 'my-modal-5',
  },
]

export default function ApaItuInaAgroGarlic() {
  return (
    <div>
      <div className='mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black'>Apa itu INA Agro-GARLIC</div>
      <div className='mx-16 w-12/12 sm:7/12 md:7/12 text-lg text-center text-black'>
        <div className='mb-6'>
          <b>
            INA Agro-GARLIC (Agroecological Assessment of Land Suitability for Garlic) adalah Sistem Informasi Geografis
            Kesesuaian Agroekologi untuk Bawang Putih pada kawasan prioritas pengembangan lahan bawang putih di
            Indonesia.
          </b>
        </div>
        <p>Struktur klasifikasi kelas kesesuaian lahan mengikuti kerangka FAO (1976) yaitu</p>
        <div className='grid grid-cols-5 gap-4 items-center justify-items-center'>
          {kesesuaianLahan.map(({ kelas, title, atribut, modal }, idx) => (
            <div
              className='card card-compact w-72 bg-base-100 shadow-xl m-9'
              key={idx}
            >
              <figure>
                <div className={atribut}></div>
              </figure>
              <div className='card-body text-justify'>
                <h2 className='card-title font-bold'>{kelas}</h2>
                <p className='mb-3'>{title}</p>
                <div className='card-actions justify-end'>
                  <label
                    htmlFor={modal}
                    className='btn btn-accent'
                  >
                    Detail
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
