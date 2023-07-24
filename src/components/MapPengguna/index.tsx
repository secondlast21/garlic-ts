import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import * as L from 'leaflet'
import { BaseUserAreaLocation, getUserAreaLocation, deleteUserAreaLocation } from '@/services/mapUserService'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { capitalizeEveryWord, setBg, setTitle } from '@/utils/utils'
import Swal from 'sweetalert2'
import { getTokenFromLocalStorage } from '@/utils/tokenManager'

export default function Index() {
  const queryClient = useQueryClient()
  const { data, isFetched } = useQuery<BaseUserAreaLocation>('getUserAreaLocation', getUserAreaLocation)

  useEffect(() => {
    const token = getTokenFromLocalStorage()
    if (token) {
      setIsTokenExisted(true)
    } else {
      setIsTokenExisted(false)
    }
  }, [])
  const [isTokenExisted, setIsTokenExisted] = useState(false)

  const { mutate } = useMutation(deleteUserAreaLocation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getUserAreaLocation')
    },
    onError: (error: any) => {
      if (error?.message) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: error?.message,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      } else if (error?.errors) {
        const source = error?.errors?.[0]?.source
        const msg = error?.errors?.[0]?.message
        const errorMsg = `${source} ${msg}`
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: capitalizeEveryWord(errorMsg),
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Kesalahan Jaringan',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-error',
          },
          confirmButtonText: 'Kembali',
        })
      }
    },
  })

  const onSubmit = (id: number) => {
    mutate(id)
  }

  var s1Icon = L.icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|10a063&chf=a,s,ee00FFFF',
  })

  var s2Icon = L.icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffcd42&chf=a,s,ee00FFFF',
  })

  var s3Icon = L.icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e99b5C&chf=a,s,ee00FFFF',
  })

  var nIcon = L.icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ce5050&chf=a,s,ee00FFFF',
  })

  var BLIcon = L.icon({
    iconUrl: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|6f6f6f&chf=a,s,ee00FFFF',
  })

  function setIcon(input: Number) {
    if (input <= 4 && input > 3.5) {
      return s1Icon
    } else if (input <= 3.5 && input > 2.5) {
      return s2Icon
    } else if (input <= 2.5 && input > 1.5) {
      return s3Icon
    } else if (input <= 1.5 && input >= 1) {
      return nIcon
    } else return BLIcon
  }

  return (
    <MapContainer
      center={[-2.071844, 120.225729]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: '1000px', width: '100%' }}
      className='z-0'
    >
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {isFetched &&
          data?.data.map((landLocation, idx) => {
            console.log(landLocation.id)
            let lat = landLocation.pointLocation?.latitude ?? 0
            let lng = landLocation.pointLocation?.longitude ?? 0
            const temp = landLocation.observations?.[0]?.growthVariables
            const elevasi = temp?.find((item) => item.variable === 'elevation')
            const lamaPenyinaran = temp?.find((item) => item.variable === 'sunshine_duration')
            const curahHujan = temp?.find((item) => item.variable === 'rainfall')
            const temperature = temp?.find((item) => item.variable === 'temperature')
            const relief = temp?.find((item) => item.variable === 'relief')
            const saturasiBasa = temp?.find((item) => item.variable === 'base_saturation')
            const kation = temp?.find((item) => item.variable === 'cation_exchange_capacity')
            const kemasamanTanah = temp?.find((item) => item.variable === 'soil_acidity')
            const teksturTanah = temp?.find((item) => item.variable === 'soil_texture')
            const drainase = temp?.find((item) => item.variable === 'drainage')
            const kedalamanMineral = temp?.find((item) => item.variable === 'soil_mineral_depth')
            const province = landLocation?.areaLocations?.find((item) => item.type === 'province')
            const district = landLocation?.areaLocations?.find((item) => item.type === 'district')
            const subDistrict = landLocation?.areaLocations?.find((item)=> item.type === 'sub_district')
            const urbanVillage = landLocation?.areaLocations?.find((item) => item.type === 'urban_village')

            return (
              <Marker
                position={[Number(lat), Number(lng)]}
                key={idx}
                icon={setIcon(Number(landLocation.observations[0].landSuitabilityClass.land))}
              >
                <Popup>
                  <div className='card card-compact w-80'>
                    <div className='card-body'>
                      <h2 className='card-title'>{landLocation.landName}</h2>
                      <div>
                        <p className='leading-relaxed'>
                          <span className='font-black'>Latitude : </span> {lat}
                        </p>
                        <p className='leading-relaxed'>
                          <span className='font-black'>Longitude : </span> {lng}
                        </p>
                        <p className='leading-relaxed'>
                          <span className='font-black'>Lokasi : </span> {`${urbanVillage?.name}, ${subDistrict?.name}, ${district?.name}, ${province?.name}`}
                        </p>
                        <p className='font-black leading-relaxed'>
                          Kelas :{' '}
                          <span className={setBg(Number(landLocation.observations[0].landSuitabilityClass.land))}>
                            {setTitle(Number(landLocation.observations[0].landSuitabilityClass.land))}
                          </span>
                        </p>
                        <p className='font-black leading-relaxed'>
                          Faktor yang tidak dapat dikendalikan dan tidak dapat dikoreksi :{' '}
                          <span
                            className={setBg(
                              Number(
                                landLocation.observations[0].landSuitabilityClass.uncorrectableAndUncontrollableFactor
                              )
                            )}
                          >
                            {setTitle(
                              Number(
                                landLocation.observations[0].landSuitabilityClass.uncorrectableAndUncontrollableFactor
                              )
                            )}
                          </span>
                        </p>
                        <p className='font-black leading-relaxed'>
                          Faktor Cuaca :{' '}
                          <span
                              className={setBg(Number(landLocation.observations[0].landSuitabilityClass.weatherFactor))}
                          >
                            {setTitle(Number(landLocation.observations[0].landSuitabilityClass.weatherFactor))}
                          </span>
                        </p>
                        <p>
                          Temperatur :{' '}
                          <span className={setBg(Number(temperature?.class))}>
                            {setTitle(Number(temperature?.class))}
                          </span>
                        </p>
                        <p>
                          Curah Hujan :{' '}
                          <span className={setBg(Number(curahHujan?.class))}>
                            {setTitle(Number(curahHujan?.class))}
                          </span>
                        </p>
                        <p>
                          Lama Penyinaran :{' '}
                          <span className={setBg(Number(lamaPenyinaran?.class))}>
                            {setTitle(Number(lamaPenyinaran?.class))}
                          </span>
                        </p>
                        <p className='font-black leading-relaxed'>
                          Faktor Relief :{' '}
                          <span
                            className={setBg(Number(landLocation.observations[0].landSuitabilityClass.reliefFactor))}
                          >
                            {setTitle(Number(landLocation.observations[0].landSuitabilityClass.reliefFactor))}
                          </span>
                        </p>
                        <p>
                          Elevasi :{' '}
                          <span className={setBg(Number(elevasi?.class))}>{setTitle(Number(elevasi?.class))}</span>
                        </p>
                        <p>
                          Relief :{' '}
                          <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                        </p>
                        <p className='font-black leading-relaxed'>
                          Faktor yang dapat dikoreksi :{' '}
                          <span
                            className={setBg(
                              Number(landLocation.observations[0].landSuitabilityClass.correctableFactor)
                            )}
                          >
                            {setTitle(Number(landLocation.observations[0].landSuitabilityClass.correctableFactor))}
                          </span>
                        </p>
                        <p>
                          Kedalaman Mineral Tanah :{' '}
                          <span className={setBg(Number(kedalamanMineral?.class))}>
                            {setTitle(Number(kedalamanMineral?.class))}
                          </span>
                        </p>
                        <p>
                          Saturasi Basa :{' '}
                          <span className={setBg(Number(saturasiBasa?.class))}>
                            {setTitle(Number(saturasiBasa?.class))}
                          </span>
                        </p>
                        <p>
                          Kemasaman Tanah :{' '}
                          <span className={setBg(Number(kemasamanTanah?.class))}>
                            {setTitle(Number(kemasamanTanah?.class))}
                          </span>
                        </p>
                        <p className='font-black leading-relaxed'>
                          Faktor yang dapat dikendalikan :{' '}
                          <span
                            className={setBg(
                              Number(landLocation.observations[0].landSuitabilityClass.controllableFactor)
                            )}
                          >
                            {setTitle(Number(landLocation.observations[0].landSuitabilityClass.controllableFactor))}
                          </span>
                        </p>
                        <p>
                          Drainase :{' '}
                          <span className={setBg(Number(drainase?.class))}>{setTitle(Number(drainase?.class))}</span>
                        </p>
                        <p>
                          Tekstur Tanah :{' '}
                          <span className={setBg(Number(teksturTanah?.class))}>
                            {setTitle(Number(teksturTanah?.class))}
                          </span>
                        </p>
                        <p>
                          Kapasitas Tukar Kation :{' '}
                          <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                        </p>
                      </div>
                      {isTokenExisted && (
                        <div className='card-actions justify-end'>
                          <button
                            className='btn btn-error'
                            onClick={() => onSubmit(Number(landLocation.id))}
                          >
                            Hapus Lahan
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
      </>
    </MapContainer>
  )
}
