import { Card, CardHeader, CardTitle } from "../ui/card";
import { Syringe, FileText, Pill, TestTube, ArrowLeft } from "lucide-react";

export default function MedicalRecords({ petInfo, onBack }) {
    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <div className="flex items-center mb-4">
                <button
                    onClick={onBack}
                    className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg mr-2"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>
                <h1 className="text-2xl font-bold">Medical Records</h1>
            </div>

            <div className="cursor-pointer">
                <Card className="rounded-2xl hover:shadow-md transition-shadow border-2 border-blue-100">
                    <CardHeader className="flex flex-row items-center gap-4 p-6">
                        <div className="bg-blue-50 p-3 rounded-xl">
                            <Syringe className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-semibold mb-1">Vaccines</CardTitle>
                            <p className="text-sm text-gray-600">View vaccination history</p>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* 其他卡片保持相同的结构 */}
        </div>
    );
}