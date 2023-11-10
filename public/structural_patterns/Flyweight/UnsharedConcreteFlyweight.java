public class UnsharedConcreteFlyweight implements Flyweight{

    private String allState;

    public UnsharedConcreteFlyweight(String allState){
        this.allState = allState;
    }

    @Override
    public void operation(String extrinsicState) {
        this.allState = extrinsicState;
    }
}
