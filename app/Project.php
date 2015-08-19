<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  public function lists()
    {
        return $this->hasMany('App\Lists');
    }
}
