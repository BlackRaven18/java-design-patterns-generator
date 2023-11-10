public abstract class Abstraction {

    protected Implementor imp;

    public Abstraction(Implementor imp){
        this.imp = imp;
    }

    public void operation(){
        imp.operationImp();
    }
}
