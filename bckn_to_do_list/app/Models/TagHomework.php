<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagHomework extends Model
{
    use HasFactory;

    protected $table = 'tareas_etiqueta';

    protected $fillable = [
        'tarea_id',
        'etiqueta_id',
    ];

    // -------------------------------------- RELATIONS MODELS --------------------------------------------//
    public function homeworkID()
    {
        return $this->belongsTo(Homework::class, 'tarea_id');
    }

    public function tagID()
    {
        return $this->belongsTo(Tag::class, 'etiqueta_id');
    }   
}
