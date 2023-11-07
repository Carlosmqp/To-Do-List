<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Homework;
use Illuminate\Http\Request;

class HomeworkController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function show()
    {
        $homeworks = Homework::with(['userID'])
        ->groupBy('id')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $homeworks,
        ], 200);

    }

    
    public function create(Request $request)
    {
        try {
            $request->validate([
                'titulo' => 'required|string|max:255',
                'descripcion' => 'required|string|max:255',
                'estado' => 'required|integer',
                'fecha_creacion' => 'required|date',
                'fecha_vencimiento' => 'required|date',
                'asignado_a' => 'required|integer',
                'etiquetas' => 'required|integer',
            ]);
            
            Homework::create([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                'estado' => $request->estado,
                'fecha_creacion' => $request->fecha_creacion,
                'fecha_vencimiento' => $request->fecha_vencimiento,
                'asignado_a' => $request->asignado_a,
                'etiquetas' => $request->etiquetas,
            ]); 

            return response()->json([
                'status' => 'success',
                'message' => 'Homework created successfully',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'something went wrong',
                'errors' => $e,
            ], 500);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $homework = Homework::findOrFail($id);
            $request->validate([
                'titulo' => 'string|max:255',
                'descripcion' => 'string|max:255',
                // 'estado' => 'integer',
                'fecha_creacion' => 'date',
                'fecha_vencimiento' => 'date',
                // 'asignado_a' => 'integer',
                // 'cod_etiquetas' => 'integer',
            ]);

            $homework->update([
                'titulo' => $request->titulo,
                'descripcion' => $request->descripcion,
                // 'estado' => $request->estado,
                'fecha_creacion' => $request->fecha_creacion,
                'fecha_vencimiento' => $request->fecha_vencimiento,
                // 'asignado_a' => $request->asignado_a,
                // 'cod_etiquetas' => $request->cod_etiquetas,
            ]); 

            return response()->json([
                'status' => 'success',
                'message' => 'Homework updated successfully',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'something went wrong',
                'errors' => $e,
            ], 500);
        }
    }


    public function destroy(string $id)
    {
        try {          
            $homework = Homework::findOrFail($id);
            $homework->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Homework deleted successfully',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'something went wrong',
                'errors' => $e,
            ], 500);
        }
    }
}
