<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use App\Models\User;
// use Tymon\JWTAuth\Contracts\JWTSubject;


class Tareas extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'fecha_creacion',
        'fecha_vencimiento',
        'asignado_a',
        'cod_etiquetas',
    ];

    protected $casts = [
        'fecha_creacion' => 'date',
        'fecha_vencimiento' => 'date',
        // Otros atributos y sus castings aquí
    ];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    // Definición de la relación "pertenece a" con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class, 'asignado_a');
    }

}
