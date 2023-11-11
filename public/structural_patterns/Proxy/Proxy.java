public class $PROXY_CLASS_NAME$ implements $SUBJECT_CLASS_NAME${

    private $REAL_SUBJECT_CLASS_NAME$ realSubject;

    public $PROXY_CLASS_NAME$($REAL_SUBJECT_CLASS_NAME$ realSubject){
        this.realSubject = realSubject;
    }

    @Override
    public void $REQUEST_METHOD_NAME$() {
        realSubject.$REQUEST_METHOD_NAME$();
    }
}
