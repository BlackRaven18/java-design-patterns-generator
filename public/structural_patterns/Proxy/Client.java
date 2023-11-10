public class Client {

    private Subject subject;

    public Client(Subject subject){
        // subject can be a proxy
        this.subject = subject;
    }

    public void operation(){
        subject.Request();
    }

}
