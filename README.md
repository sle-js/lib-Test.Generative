Now that we have an assertion interface it is possible to create an  assertion package that gives us the ability to 
create generative tests.  I really like the idea of generative testing as these tests are able to identify scenarios 
that ordinarily I have missed.

So what would this look like.  The way I am going to demonstrate and create this generative package is to assemble, as a
test, the tests for the String [Calculator Kata](http://osherove.com/tdd-kata-1/).  The code for this can be found in
[test/sc](./test/sc).

