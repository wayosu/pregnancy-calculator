import React, { useState } from "react";

const PregnancyCalculator: React.FC = () => {
    interface BabyDevelopment {
        weekRange: string;
        size: string | { pb: string; bb: string };
        milestones: string[];
    }

    const getBabyDevelopment = (weeks: number): BabyDevelopment | null => {
        if (weeks >= 1 && weeks <= 4) {
            return {
                weekRange: "1-4",
                size: "6-7 mm",
                milestones: ["Pada minggu ke-4, embrio mulai terbentuk.", "Embrio telah membelah dan memiliki tiga lapisan yang kelak akan menjadi organ-organ tubuh si Kecil."]
            };
        } else if (weeks >= 5 && weeks <= 9) {
            return {
                weekRange: "5-9",
                size: { pb: "4 cm", bb: "1 gr" },
                milestones: ["Organ ginjal, hati dan paru-paru akan mulai terbetuk dan jantungnya sudah mulai berdetak.", "Memasuki minggu ke 8, Bibir, hidung, alis mata dan kaki mulai terbentuk."]
            };
        } else if (weeks >= 10 && weeks <= 13) {
            return {
                weekRange: "10-13",
                size: { pb: "6,5-9 cm", bb: "10-50 gr" },
                milestones: ["Tangan, kaki dan kuku mulai terbentuk. Ia sudah bisa membuka dan menutup genggaman tangannya.", "Indra pendengaran dan sistem reproduksi mulai berkembang."]
            };
        } else if (weeks >= 14 && weeks <= 17) {
            return {
                weekRange: "14-17",
                size: { pb: "12,5-16 cm", bb: "85-280 gr" },
                milestones: ["Si Kecil mulai bisa melakukan gerakan bernafas dan menelan, dan bahkan bisa menghisap Ibu jarinya.", "Mata si Kecil mulai berfungsi, dan bisa bergerak ke kanan dan kiri."]
            };
        } else if (weeks >= 18 && weeks <= 22) {
            return {
                weekRange: "18-22",
                size: { pb: "20,5-25 cm", bb: "210-400 gr" },
                milestones: ["Bunda mulai bisa merasakan gerakan si Kecil, karena dia mulai aktif berputar, meninju dan menendang.", "Di minggu ke-22, si Kecil mulai bisa mendengar suara Bunda, Ayah, dan suara lainnya."]
            };
        } else if (weeks >= 23 && weeks <= 27) {
            return {
                weekRange: "23-27",
                size: { pb: "27,5-32,5 cm", bb: "485-1000 gr" },
                milestones: ["Saat ini wajah si Kecil sudah hampir sempurna, namun helai rambut masih berwarna putih dan belum terbentuk pigmen.", "Di minggu ke-26, Si Kecil sudah bisa membuka matanya."]
            };
        } else if (weeks >= 28 && weeks <= 31) {
            return {
                weekRange: "28-31",
                size: { pb: "35-37,5 cm", bb: "1150-1610 gr" },
                milestones: ["Si Kecil saat ini mulai bisa mengedip, dan dia juga bisa tertidur dan bermimpi.", "Pada minggu ke 31, otak si Kecil mulai tumbuh pesat."]
            };
        } else if (weeks >= 32 && weeks <= 35) {
            return {
                weekRange: "32-35",
                size: { pb: "40-42,5 cm", bb: "1810-2500 gr" },
                milestones: ["Kulit si Kecil semakin tebal dan antibodi dari Bunda mulai mengalir kepada si Kecil melalui tali pusatnya.", "Pada minggu ke 34, si Kecil terus tumbuh dan berat badannya bisa naik 220gr per minggunya dan posisi kepalanya sudah di bawah."]
            };
        } else if (weeks >= 36 && weeks <= 40) {
            return {
                weekRange: "36-40",
                size: { pb: "45-50 cm", bb: "2690-3300 gr" },
                milestones: ["Pada minggu ke 38, semua sistem organ sudah siap dan matang untuk kehidupan diluar Rahim.", "Memasuki minggu ke 40, saatnya Bunda berjumpa dengan si Kecil!."]
            };
        }
        return null; // Return null if no milestones are found for the given weeks
    };    

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [gestationalAge, setGestationalAge] = useState<number | null>(null);
    const [trimester, setTrimester] = useState<string>("");
    const [trimesterDates, setTrimesterDates] = useState<{ trimester1: string; trimester2: string; trimester3: string }>({
        trimester1: "",
        trimester2: "",
        trimester3: ""
    });

    const calculatePregnancyDetails = (): void => {
        if (day && month && year) {
            const hphtDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            const dueDateEstimate = new Date(hphtDate);
            dueDateEstimate.setDate(dueDateEstimate.getDate() + 280);

            const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
            setDueDate(dueDateEstimate.toLocaleDateString("id-ID", options));

            const today = new Date();
            const timeDiff = today.getTime() - hphtDate.getTime();
            const weeksPregnant = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

            const trimester1End = new Date(hphtDate);
            trimester1End.setDate(trimester1End.getDate() + 13 * 7);
            const trimester2Start = new Date(trimester1End);
            trimester2Start.setDate(trimester2Start.getDate() + 1);
            const trimester2End = new Date(trimester2Start);
            trimester2End.setDate(trimester2End.getDate() + 13 * 7);
            const trimester3Start = new Date(trimester2End);
            trimester3Start.setDate(trimester3Start.getDate() + 1);
            const trimester3End = dueDateEstimate;

            const trimester1Range = `${hphtDate.toLocaleDateString("id-ID", options)} - ${trimester1End.toLocaleDateString("id-ID", options)}`;
            const trimester2Range = `${trimester2Start.toLocaleDateString("id-ID", options)} - ${trimester2End.toLocaleDateString("id-ID", options)}`;
            const trimester3Range = `${trimester3Start.toLocaleDateString("id-ID", options)} - ${trimester3End.toLocaleDateString("id-ID", options)}`;

            setTrimesterDates({
                trimester1: trimester1Range,
                trimester2: trimester2Range,
                trimester3: trimester3Range,
            });

            let currentTrimester: string = "";
            if (weeksPregnant <= 13) {
                currentTrimester = "Trimester 1";
            } else if (weeksPregnant <= 26) {
                currentTrimester = "Trimester 2";
            } else {
                currentTrimester = "Trimester 3";
            }

            setGestationalAge(weeksPregnant);
            setTrimester(currentTrimester);
        }
    };

    const babyDevelopment = getBabyDevelopment(gestationalAge || 0);

    const calculateProgressForTrimester = (startWeek: number, endWeek: number, weeksPregnant: number): number => {
        if (weeksPregnant < startWeek) return 0;
        if (weeksPregnant > endWeek) return 100;
        return ((weeksPregnant - startWeek) / (endWeek - startWeek)) * 100;
    };

    const trimester1Progress = calculateProgressForTrimester(0, 13, gestationalAge || 0);
    const trimester2Progress = calculateProgressForTrimester(14, 26, gestationalAge || 0);
    const trimester3Progress = calculateProgressForTrimester(27, 40, gestationalAge || 0);

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kalkulator Kehamilan</h2>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
                Tanggal Hari Pertama Haid Terakhir (HPHT):
            </label>
            <div className="flex w-full space-x-2 mb-4">
                <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">Hari</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">Bulan</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
                        </option>
                    ))}
                </select>
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="px-3 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    <option value="">Tahun</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={calculatePregnancyDetails}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
                Hitung Detail Kehamilan
            </button>

            {dueDate && (
                <div className="mt-6 text-gray-700">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Tanggal Perkiraan Lahir</h3>
                        <p className="text-blue-600">{dueDate}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Usia Kehamilan</h3>
                        <p>{gestationalAge} minggu</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Trimester Saat Ini</h3>
                        <p>{trimester}</p>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-2">Detail Trimester</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full"
                                        style={{ width: `${trimester1Progress}%` }}
                                    ></div>
                                </div>
                                <h1 className="font-bold text-sm">Trimester 1</h1>
                                <p className="text-xs text-gray-500">{trimesterDates.trimester1}</p>
                            </div>
                            <div>
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full"
                                        style={{ width: `${trimester2Progress}%` }}
                                    ></div>
                                </div>
                                <h1 className="font-bold text-sm">Trimester 2</h1>
                                <p className="text-xs text-gray-500">{trimesterDates.trimester2}</p>
                            </div>
                            <div>
                                <div className="w-full bg-gray-200 rounded-full h-4 mb-1">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full"
                                        style={{ width: `${trimester3Progress}%` }}
                                    ></div>
                                </div>
                                <h1 className="font-bold text-sm">Trimester 3</h1>
                                <p className="text-xs text-gray-500">{trimesterDates.trimester3}</p>
                            </div>
                        </div>
                    </div>

                    {babyDevelopment && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <div className="flex flex-col gap-3 items-center justify-center text-center">
                                <div>
                                    <h3 className="font-semibold mb-1">Perkembangan si Kecil</h3>
                                    <p className="text-xl font-bold">di Minggu ke {babyDevelopment.weekRange}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Si Kecil saat ini berukuran</p>
                                    {babyDevelopment.size && typeof babyDevelopment.size === "string" && <p>{babyDevelopment.size}</p>}
                                    {babyDevelopment.size && typeof babyDevelopment.size === "object" && (
                                        <>
                                            <p className="font-bold">PB: {babyDevelopment.size.pb}</p>
                                            <p className="font-bold">BB: {babyDevelopment.size.bb}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="bg-blue-600 text-white p-6 rounded-lg mt-4">
                                <div className="text-center mb-4">
                                    <h1 className="inline-block text-center text-lg font-bold bg-white text-blue-600 px-4 py-2 rounded-lg">Perkembangan si Kecil Bulan ini</h1>
                                </div>
                                <ul className="list-disc list-inside space-y-2">
                                    {babyDevelopment.milestones.map((milestone, index) => (
                                        <li key={index}>{milestone}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PregnancyCalculator;
