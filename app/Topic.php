<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
  protected $fillable = ['title', 'content'];
  public function comments()
  {
      return $this->hasMany('App\Comment');
  }
}
