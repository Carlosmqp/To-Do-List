<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $table = 'etiquetas';

    protected $fillable = [
        'etiqueta',
        'tarea_id',
    ];

    // -------------------------------------- RELATIONS MODELS --------------------------------------------//
    public function homeworkID()
    {
        return $this->belongsTo(Homework::class, 'tarea_id');
    }
}
