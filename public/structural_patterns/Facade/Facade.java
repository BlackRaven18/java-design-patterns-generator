public class Facade {

    public void doSomethingImportant(int importantData){
        SubsystemClassA subsystemClassA = new SubsystemClassA();
        SubsystemClassB subsystemClassB = new SubsystemClassB();

        subsystemClassA.doOneThing();
        subsystemClassB.doOtherThing(importantData);
    }
}
