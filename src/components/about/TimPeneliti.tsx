import Peneliti from "./Peneliti"
import buImas from "../../../public/bu_imas.jpeg"
import profSobir from "../../../public/prof_sobir.jpeg"
import buAnnisa from "../../../public/bu_annisa.png"
import paAsyhar from "../../../public/pa_asyhar.png"
import ojan from "../../../public/ojan.png"
import reja from "../../../public/reja.png"

const paraPeneliti = [
    { 
        name: "Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom",
        role: "Peneliti",
        image: {buImas},
    },
    { 
        name: "Prof. Dr. Ir. Sobir, M.Si",
        role: "Peneliti",
        image: {profSobir},
    },
    { 
        name: "Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom",
        role: "Peneliti",
        image: {buImas},
    },
    { 
        name: "Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom",
        role: "Peneliti",
        image: {buImas},
    },
    { 
        name: "Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom",
        role: "Peneliti",
        image: {buImas},
    },
    { 
        name: "Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom",
        role: "Peneliti",
        image: {buImas},
    },
]

export default function TimPeneliti() {
    return (
        <div>
            <div className="mx-16 mt-16 mb-8 text-5xl font-bold text-center text-black">
                Tim Peneliti
            </div>
            <div>
                <div className="pb-16 mx-16">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex justify-center">
                            <Peneliti
                                name="Prof. Dr. Imas Sukaesih Sitanggang, S.Si, M.Kom"
                                role="Peneliti"
                                image={buImas}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Peneliti
                                name="Prof. Dr. Ir. Sobir, M.Si"
                                role="Peneliti"
                                image={profSobir}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Peneliti
                                name="Dr. Eng. Annisa, S.Kom., M.Kom"
                                role="Peneliti"
                                image={buAnnisa}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Peneliti
                                name="Muhammad Asyhar Agmalaro, S.Si, M.Kom"
                                role="Peneliti"
                                image={paAsyhar}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Peneliti
                                name="Muhammad Fauzan Ramadhan"
                                role="Peneliti"
                                image={ojan}
                            />
                        </div>
                        <div className="flex justify-center">
                            <Peneliti
                                name="Reza Achmad Naufal"
                                role="Peneliti"
                                image={reja}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}