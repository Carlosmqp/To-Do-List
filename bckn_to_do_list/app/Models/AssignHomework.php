<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignHomework extends Model
{
    use HasFactory;

    protected $table = 'tareas_asignadas';

    protected $fillable = [
        'tarea_id',
        'usuario_id',
    ];

    // -------------------------------------- RELATIONS MODELS --------------------------------------------//
    public function homeworkID()
    {
        return $this->belongsTo(Homework::class, 'tarea_id');
    }

    public function userID()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }    

}
