<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function show()
    {
        $tag = Tag::with(['userID'])
        ->groupBy('id')
        ->get();

        return response()->json([
            'status' => 'success',
            'data' => $tag,
        ], 200);

    }



    public function create(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|string|max:255',
            ]);
            
            Tag::create([
                'nombre' => $request->etiqueta,
            ]); 

            return response()->json([
                'status' => 'success',
                'message' => 'Tag created successfully',
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
            $tag = Tag::findOrFail($id);
            $request->validate([
                'nombre' => 'required|string|max:255',
            ]);

            $tag->update([
                'nombre' => $request->etiqueta,
            ]); 

            return response()->json([
                'status' => 'success',
                'message' => 'tag updated successfully',
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
            $tag = Tag::findOrFail($id);
            $tag->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Tag deleted successfully',
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
