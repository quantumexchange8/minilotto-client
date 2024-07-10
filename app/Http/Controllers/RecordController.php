<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecordController extends Controller
{
    /**
     * Main page.
     */
    public function index(Request $request)
    {
        // Get the flashed messages from the session
        $toastOption = $request->session()->get('toastOption');

        // Clear the flashed messages from the session
        $request->session()->forget('toastOption');
        $request->session()->save();

        if (isset($toastOption)) {
            return Inertia::render('Dashboard/Dashboard', [
                'toastOption' => $toastOption
            ]);
        }
        return Inertia::render('Dashboard/Dashboard');
    }
    
    /**
     * Get all records.
     */
    public function getAllRecords()
    {
        $query = Record::query();

        $endDate = now(new \DateTimeZone('Asia/Kuala_Lumpur'))->format('Y-m-d');
        $startDate = now(new \DateTimeZone('Asia/Kuala_Lumpur'))->subDays(30)->format('Y-m-d');

        $query->whereDate('created_at', '>=', $startDate)
              ->whereDate('created_at', '<=', $endDate);
    
        $data = $query->orderBy('created_at', 'desc')->get();
        return response()->json($data);
    }
}
