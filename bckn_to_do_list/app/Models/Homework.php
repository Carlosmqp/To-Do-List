<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;

    protected $table = 'tareas';

    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'fecha_creacion',
        'fecha_vencimiento',
        'asignado_a',
        'cod_etiquetas',
    ];

    // -------------------------------------- RELATIONS MODELS --------------------------------------------//
    public function userID()
    {
        return $this->belongsTo(User::class, 'asignado_a');
    }
}
