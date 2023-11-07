<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Tareas;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register','tareas']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function me()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function tareas(Request $request){
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            // 'estado' => 'required|integer',
            'fecha_creacion' => 'required|date',
            'fecha_vencimiento' => 'required|date',
            // 'asignado_a' => 'required|integer',
            // 'cod_etiquetas' => 'required|integer',
        ]);
        $credentials = $request->only('titulo', 'descripcion', 'fecha_creacion', 'fecha_vencimiento');

        Tareas::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            // 'estado' => $request->estado,
            'fecha_creacion' => $request->fecha_creacion,
            'fecha_vencimiento' => $request->fecha_vencimiento,
            // 'asignado_a' => $request->asignado_a,
            // 'cod_etiquetas' => $request->cod_etiquetas,
        ]);

        $tarea = Auth::attempt($credentials);
        if (!$tarea) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        Auth::tareas();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully',
        ]);
    }

}
