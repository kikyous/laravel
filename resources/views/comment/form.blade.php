<form action="{{ URL('comment/'.$comment->id) }}" method="POST">
  {!! csrf_field() !!}
  <input type="hidden" name="topic_id" value='{{ $topic->id }}'>
  @if ($comment->id)
    <input name="_method" type="hidden" value="PUT">
  @endif
  <div class="form-group">
    <label for="exampleInputPassword1">Content</label>
    <textarea class="form-control" name='content'>{{ $comment->content }}</textarea>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
