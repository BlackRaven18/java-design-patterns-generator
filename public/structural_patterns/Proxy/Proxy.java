public class Proxy implements Subject{

    private RealSubject realSubject;

    public Proxy(RealSubject realSubject){
        this.realSubject = realSubject;
    }

    @Override
    public void Request() {
        realSubject.Request();
    }
}
