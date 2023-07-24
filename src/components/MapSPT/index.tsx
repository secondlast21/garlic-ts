import { MapContainer, TileLayer, Popup, Polygon, LayersControl, LayerGroup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { useQuery } from 'react-query'
import { getLand } from '@/services/mapService'
import { LandLocation } from '@/services/mapService'
import { BaseMapResponse } from '@/services/mapService'
import { useState, useEffect } from 'react'
import { setBg, setTitle, landColor } from '@/utils/utils'

const param: LandLocation = {
  districtCode: '3308',
}

export default function Index() {
  const [coordinates, setCoordinates] = useState<any>([])

  const { data: dataLand, isFetched: isFetchedLand } = useQuery<BaseMapResponse>('getLandLocation', () =>
    getLand(param)
  )

  console.log(dataLand)

  useEffect(() => {
    if (isFetchedLand) {
      const _coordinates = dataLand?.data?.map((landLocation) => {
        return landLocation.geometryLandLocation.geometry.geometry.coordinates?.map((coorMap) => {
          let temp = coorMap.reverse()
          temp?.map((location) => location.reverse())
          return temp
        })
      })
      setCoordinates(_coordinates)
    }
  }, [isFetchedLand])

  return (
    <div>
      <MapContainer
        center={[-2.071844, 120.225729]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: '1000px', width: '100%' }}
        className='z-0'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LayersControl position='topright'>
          <LayersControl.Overlay
            checked
            name='Peta Kesesuaian Lahan'
          >
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const province = dataLand?.data[index]?.areaLocations?.find((item) => item.type === 'province')
                  const district = dataLand?.data[index]?.areaLocations?.find((item) => item.type === 'district')

                  const landSuitabilityClass = dataLand?.data[index]?.observations[0]?.landSuitabilityClass?.land
                  const faktorTidakDapatDikendalikanDanDikoreksi = dataLand?.data[index]?. observations[0]?.landSuitabilityClass?.uncorrectableAndUncontrollableFactor
                  const faktorCuaca = dataLand?.data[index]?.observations[0]?.landSuitabilityClass?.weatherFactor
                  const faktorRelief = dataLand?.data[index]?.observations[0]?.landSuitabilityClass?.reliefFactor
                  const faktorDapatDikendalikan = dataLand?.data[index]?. observations[0]?.landSuitabilityClass?.controllableFactor
                  const faktorDapatDikoreksi = dataLand?.data[index]?. observations[0]?.landSuitabilityClass?.controllableFactor
                  const { fillColor, color } = landColor(Number(landSuitabilityClass)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p className='leading-relaxed'>
                                <span className='font-black'>Kabupaten/Kota : </span> {district?.name}
                              </p>
                              <p className='leading-relaxed'>
                                <span className='font-black'>Provinsi : </span> {province?.name}
                              </p>
                              <p className='font-black leading-relaxed'>
                                Kelas kesesuaian lahan:{' '}
                                <span className={setBg(Number(landSuitabilityClass))}>
                                  {setTitle(Number(landSuitabilityClass))}
                                </span>
                              </p>
                              <p className='font-black leading-relaxed'>
                                Faktor yang tidak dapat dikendalikan dan tidak dapat dikoreksi :{' '}
                                <span className={setBg(Number(faktorTidakDapatDikendalikanDanDikoreksi))}>
                                  {setTitle(Number(faktorTidakDapatDikendalikanDanDikoreksi))}
                                </span>
                              </p>
                              <p className='font-black leading-relaxed'>
                                Faktor cuaca :{' '}
                                <span className={setBg(Number(faktorCuaca))}>
                                  {setTitle(Number(faktorCuaca))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p className='font-black leading-relaxed'>
                                Faktor relief :{' '}
                                <span className={setBg(Number(faktorRelief))}>
                                  {setTitle(Number(faktorRelief))}
                                </span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p className='font-black leading-relaxed'>
                                Faktor yang dapat dikoreksi :{' '}
                                <span className={setBg(Number(faktorDapatDikoreksi))}>
                                  {setTitle(Number(faktorDapatDikoreksi))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p className='font-black leading-relaxed'>
                                Faktor yang dapat dikendalikan :{' '}
                                <span className={setBg(Number(faktorDapatDikendalikan))}>
                                  {setTitle(Number(faktorDapatDikendalikan))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Saturasi Basa'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(saturasiBasa?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Kedalaman Mineral Tanah'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(kedalamanMineral?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Tekstur Tanah'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(teksturTanah?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Kemasaman Tanah'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(kemasamanTanah?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Drainase'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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
                  const { fillColor, color } = landColor(Number(drainase?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Kapasitas Tukar Kation'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(kation?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Relief'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(relief?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Elevasi'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(elevasi?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Temperatur'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(temperature?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Lama Penyinaran'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(lamaPenyinaran?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Curah Hujan'>
            <LayerGroup>
              {isFetchedLand &&
                coordinates?.map((polygonCoords: any, index: any) => {
                  const temp = dataLand?.data[index].observations[0]?.growthVariables
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

                  const { fillColor, color } = landColor(Number(curahHujan?.class)) || {
                    fillColor: '#000000',
                    color: '#000000',
                  }

                  return (
                    <Polygon
                      key={index}
                      pathOptions={{
                        fillColor,
                        color,
                        weight: 1,
                        fillOpacity: 1,
                      }}
                      positions={polygonCoords}
                    >
                      <Popup>
                        <div className='card card-compact w-80'>
                          <div className='card-body'>
                            <h2 className='card-title'>Keterangan Lahan</h2>
                            <div>
                              <p>
                                Saturasi Basa:{' '}
                                <span className={setBg(Number(saturasiBasa?.class))}>
                                  {setTitle(Number(saturasiBasa?.class))}
                                </span>
                              </p>
                              <p>
                                Kedalaman Mineral Tanah:{' '}
                                <span className={setBg(Number(kedalamanMineral?.class))}>
                                  {setTitle(Number(kedalamanMineral?.class))}
                                </span>
                              </p>
                              <p>
                                Tekstur Tanah:{' '}
                                <span className={setBg(Number(teksturTanah?.class))}>
                                  {setTitle(Number(teksturTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Kemasaman Tanah:{' '}
                                <span className={setBg(Number(kemasamanTanah?.class))}>
                                  {setTitle(Number(kemasamanTanah?.class))}
                                </span>
                              </p>
                              <p>
                                Drainase:{' '}
                                <span className={setBg(Number(drainase?.class))}>
                                  {setTitle(Number(drainase?.class))}
                                </span>
                              </p>
                              <p>
                                Kapasitas Tukar Kation:{' '}
                                <span className={setBg(Number(kation?.class))}>{setTitle(Number(kation?.class))}</span>
                              </p>
                              <p>
                                Relief:{' '}
                                <span className={setBg(Number(relief?.class))}>{setTitle(Number(relief?.class))}</span>
                              </p>
                              <p>
                                Elevasi:{' '}
                                <span className={setBg(Number(elevasi?.class))}>
                                  {setTitle(Number(elevasi?.class))}
                                </span>
                              </p>
                              <p>
                                Temperatur:{' '}
                                <span className={setBg(Number(temperature?.class))}>
                                  {setTitle(Number(temperature?.class))}
                                </span>
                              </p>
                              <p>
                                Lama Penyinaran:{' '}
                                <span className={setBg(Number(lamaPenyinaran?.class))}>
                                  {setTitle(Number(lamaPenyinaran?.class))}
                                </span>
                              </p>
                              <p>
                                Curah Hujan:{' '}
                                <span className={setBg(Number(curahHujan?.class))}>
                                  {setTitle(Number(curahHujan?.class))}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Polygon>
                  )
                })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  )
}
