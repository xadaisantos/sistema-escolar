<?php

namespace App;
use DateTime;

use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    protected $table = 'alunos';
    protected $guarded = [];
    protected $dates = ['created_at'];
    public $timestamps = false;

    public function getDataDeNascimentoAttribute($value)
    {
        if ( empty($value) ) {
            return $value;
        } else {
            $data = DateTime::createFromFormat('Y-m-d', $value)->format('d/m/Y');
            return $data;
        }
    }

    public function setDataDeNascimentoAttribute($value)
    {
        if ( empty($value) ) {
            $this->attributes['data_de_nascimento'] = null;
        } else if ( !DateTime::createFromFormat('d/m/Y', $value) ) {
            $this->attributes['data_de_nascimento'] = null;
        } else {
            $data = DateTime::createFromFormat('d/m/Y', $value)->format('Y-m-d');
            $this->attributes['data_de_nascimento'] = $data;
        }
    }

    public function setNomeAttribute($value)
    {
        $value = trim(mb_strtoupper($value));
        $this->attributes['nome'] = $value;
        
    }
}
