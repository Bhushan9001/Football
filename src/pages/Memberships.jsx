import AOS from "aos";
import styled from "styled-components";
import Button from "../ui/Button";
import Container from "../ui/Container";
import DiagonalCutLine from "../ui/DiagonalCutLine";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const SectionHeader = styled.h2`
  /* font-size: 95px; */
  font-weight: 700;
  font-family: inherit;
  text-transform: uppercase;
  line-height: 90px;
  position: relative;
  z-index: 10;
`;

function Memberships() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
  return (
    <main>
      <section className="relative z-20 bg-[url('/assets/img/website/memberships/IMG-20210824-WA0005-min.png')] bg-no-repeat pb-20 pt-60 text-white">
        <div className="absolute top-0 h-1/2 w-full bg-WebsiteHeaderGradientV1"></div>
        <Container classNames="relative">
          <div className="flex flex-col items-center">
            <h1
              data-aos="fade-up"
              data-aos-duration="1000"
              className="relative z-10  text-5xl font-bold md:text-7xl xl:text-8xl xlCustom:text-[85px]"
            >
              MEMBERSHIPS
              <DiagonalCutLine
                classNames="absolute bottom-0 xl:bottom-6 left-[15%] -z-10 h-4 md:h-9 xl:h-[37px] w-[60%]"
                color="#e61b3d"
              />
            </h1>
            <h3 className="mb-20 mt-[30px] text-center text-[20px] lg:mb-40 lg:text-2xl">
              JOIN THE TEAM AND UNLOCK YOUR MEMBERSHIP POTENTIAL
            </h3>
          </div>
          {/* Pricing Cards */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
            {/* 01) */}
            <div className="flex-1 bg-[linear-gradient(150deg,_#FFFFFF_0%,_#FFBD65_70%)] p-8 text-secondary xl:p-10">
              <h4 className="relative z-10 mb-10 justify-center text-[30px] font-bold lg:text-[40px] xl:text-[54px]">
                GOLD
                <DiagonalCutLine
                  classNames="absolute -bottom-2 lg:bottom-2 left-0 h-5 -z-10 before:!-right-6 w-[100px] lg:w-[30%]"
                  color="#21dfff"
                />
              </h4>
              <ul className="flex flex-col gap-5 text-sm font-bold">
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>
                    Global football data coverage, analysis and predictions for
                    each of the 1,000+ major football teams, leagues and cups.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>
                    Complete Player Statistics: Total shots, shots on target,
                    key passes, fouls, duels, tackles, dribbles, cards, saves,
                    goal count, goal assists, substitutions, field penalties:
                    won, scored, missed
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>Daily accas tip by our artificial intelligence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>Daily bet builder tip by our expert system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>Fully automated betting diary</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-[#1FB369]">
                    <i class="bi bi-check-lg text-lg text-white"></i>
                  </span>
                  <span>And much more</span>
                </li>
              </ul>
            </div>
            {/* 02 */}
            <div className="flex-1 transform bg-[linear-gradient(150deg,_#21DFFF,_#1287A4_20%,_#001B36)] p-8 pt-20 text-white xl:-translate-y-20 xl:p-10">
              <h4 className="relative z-10 mb-10 text-[30px] font-bold lg:text-[40px] xl:text-[54px]">
                FREMIUM
                <DiagonalCutLine
                  classNames="absolute -bottom-2 lg:bottom-2 left-0 -z-10 w-[120px] lg:w-[50%] h-5"
                  color="#e61b3d"
                />
              </h4>
              <ul className="flex flex-col gap-5 text-sm font-bold leading-7 ">
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-accent">
                    <i class="bi bi-check-lg text-lg text-[#11809d]"></i>
                  </span>
                  <span>Free trial of all features of the Gold membership</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-accent">
                    <i class="bi bi-check-lg text-lg text-[#11809d]"></i>
                  </span>
                  <span>
                    One FREE daily data request after trial period ends
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-accent">
                    <i class="bi bi-check-lg text-lg text-[#11809d]"></i>
                  </span>
                  <span>No card details required</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-accent">
                    <i class="bi bi-check-lg text-lg text-[#11809d]"></i>
                  </span>
                  <span>No commitment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-accent">
                    <i class="bi bi-check-lg text-lg text-[#11809d]"></i>
                  </span>
                  <span>100% FREE</span>
                </li>
              </ul>
            </div>
            {/* 03 */}
            <div className="relative flex-1 bg-[linear-gradient(150deg,_#FFFFFF_0%,_#6F6F6F_80%)] p-8 text-[#15181A] xl:p-10">
              <div className="absolute inset-0 opacity-50"></div>
              <h3 className="absolute bottom-1/2 left-0 right-0 z-20 mx-auto max-w-[150px] translate-y-1/2 transform text-center text-[30px] font-extrabold text-white md:text-[40px] lg:bottom-16 lg:max-w-[unset] lg:translate-y-[unset] lg:leading-[78px] xl:text-[60px]">
                COMING <br className="hidden lg:block" />
                SOON
              </h3>
              <h4 className="relative z-10 mb-10 text-[30px] font-bold lg:text-[40px] xl:text-[54px]">
                PLATINUM
                <DiagonalCutLine
                  classNames="absolute h-5 -bottom-2 lg:bottom-2 left-0 -z-10 w-[120px] lg:w-[43%]"
                  color="#21dfff"
                />
              </h4>
              <ul className="flex flex-col gap-5 text-sm font-bold text-secondary opacity-90 blur">
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary">
                    <i class="bi bi-check-lg text-lg text-[#d2d2d2]"></i>
                  </span>
                  <span>
                    Global FULL DATA coverage, matches analysis and prediction
                    of 1600+ major leagues and cups all over the world.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary">
                    <i class="bi bi-check-lg text-lg text-[#d2d2d2]"></i>
                  </span>
                  <span>Technical statistics of players</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary">
                    <i class="bi bi-check-lg text-lg text-[#d2d2d2]"></i>
                  </span>
                  <span>Top scorers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary">
                    <i class="bi bi-check-lg text-lg text-[#d2d2d2]"></i>
                  </span>
                  <span>Fully automated diary</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full bg-primary">
                    <i class="bi bi-check-lg text-lg text-[#d2d2d2]"></i>
                  </span>
                  <span>and much more...</span>
                </li>
              </ul>
              <div className="mt-10 text-center opacity-50 blur">
                <button className="w-full max-w-80 bg-primary px-6 py-3 text-lg font-light text-white">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* CTA */}
      <Container>
        <div className="bg-primary px-10 py-16 text-center text-white">
          <h2 className="mb-5 text-[40px] font-semibold lg:text-[59px]">
            JOIN TODAY!
          </h2>
          <h3 className="mx-auto mb-10 max-w-[1152px] text-[20px] lg:text-[26px]">
            Join the Sports Trading Ai Predictions team today by signing up for
            a free account to receive special offers, tailor made prices, and to
            hear about all the site’s exciting new features and developments –
            you will love it!
          </h3>
          <Button to="/signup" classNames="text-lg !font-light !px-10">
            Create a free account
          </Button>
        </div>
      </Container>
      {/* GET IN TOUCH */}
      <section
        id="contact"
        className="bg-[url('/assets/img/website/home/Footer-background-illustration2-min.png')] bg-cover bg-no-repeat pb-20 pt-40 text-white"
      >
        <div className="mx-auto flex max-w-[1560px] flex-col justify-center gap-20 px-4 xl:flex-row xl:items-center">
          <div className="xl:w-1/2">
            <div className="mb-12">
              <img
                loading="lazy"
                decoding="async"
                className="max-w-[250px]"
                src="/assets/img/logo.png"
                
              />
            </div>
            <div className="mb-9 max-w-[525px] text-lg">
              <p className="mb-4 max-w-[525px] text-lg uppercase">
                WE ARE READY TO LEAD YOU INTO THE FUTURE OF ONLINE SPORTING
                DATA, WITH GLOBAL ACCESS TO OUR CUTTING EDGE, STATE OF THE ART
                WEB APPLICATION 24/7 AT THE TOUCH OF A BUTTON.
              </p>
              <p>
                <span className="uppercase text-primary">
                  Sports Trading Ai Predictions
                </span>{" "}
                – THE ULTIMATE FOOTBALL DATA WEB APPLICATION
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary">
                <i className="bi bi-tiktok text-xl font-bold"></i>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary">
                <i className="bi bi-instagram text-xl font-bold"></i>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary">
                <i className="bi bi-facebook text-xl font-bold"></i>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary">
                <i className="bi bi-youtube text-xl font-bold"></i>
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-md bg-primary">
                <i className="bi bi-twitter text-xl font-bold"></i>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-10 lg:flex-row xl:w-1/2">
            <div className="flex flex-col justify-between">
              <SectionHeader className="mb-10 max-w-[200px] text-[45px] !leading-[58px] md:text-[60px] lg:mb-2">
                GET IN TOUCH
                <DiagonalCutLine
                  classNames="absolute bottom-5 ml-5 -left-3 top-6 -z-10 w-[48%] md:w-[57%] h-[26px] before:!-right-[50px]"
                  color="#e61b3d"
                />
              </SectionHeader>
              <div className="mb-7 mt-12 hidden lg:block">
                <p className="text-lg font-bold uppercase text-primary">
                  Contact:
                </p>

                <a
                  className="text-lg"
                  href="mailto:mailto:postmaster@sports-trading-ai-predictions.com"
                >
                  postmaster@sports-trading-ai-predictions.com
                </a>
              </div>
            </div>
            <form className="flex flex-col justify-between gap-[10px] lg:w-[60%]">
              <input
                className="w-full bg-[#FFFFFF3B] p-4 text-xl font-medium"
                placeholder="Name*"
                type="text"
              />
              <input
                className="w-full bg-[#FFFFFF3B] p-4 text-xl font-medium"
                placeholder="Email"
                type="email"
              />
              <textarea
                className="w-full bg-[#FFFFFF3B] p-4 text-xl font-medium"
                placeholder="Message*"
              />
              <p className="text-sm text-[#989898]">
                This site is protected by
                <Link className="px-1 text-white">reCAPTCHA</Link>
                and the
                <Link className="px-1 text-white">Google Privacy Policy</Link>
                and
                <Link className="px-1 text-white">Terms of Services</Link>
                apply.
              </p>
              <button className="bg-primary px-10 py-4 text-lg">
                Register now
              </button>
            </form>
            <div className="mb-7 mt-12 lg:hidden">
              <p className="text-lg font-bold uppercase text-primary">
                Contact:
              </p>
              <a
                className="text-lg"
                href="mailto:mailto:postmaster@sports-trading-ai-predictions.com"
              >
                postmaster@sports-trading-ai-predictions.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Memberships;
