import AOS from "aos";
import { useEffect } from "react";
import Button from "../ui/Button";
import Container from "../ui/Container";
import DiagonalCutLine from "../ui/DiagonalCutLine";
import styled from "styled-components";
import { useParallax } from "react-scroll-parallax";
import ScrollDownAnimationIcon from "../ui/ScrollDownAnimationIcon";

const SectionHeader = styled.h2`
  /* font-size: 95px; */
  font-weight: 700;
  font-family: inherit;
  text-transform: uppercase;
  line-height: 90px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    line-height: normal;
  }
`;

function Home() {
  const parllax = useParallax({
    rotate: [95, -95],
  });

  const mobileParllax = useParallax({
    rotate: [95, -95],
  });

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <main>
      {/* 01) HERO */}
      <section className="relative z-20 bg-[url('/assets/img/website/home/hero-Image-min.jpg')] pb-20 pt-48 text-white xl:py-60">
        <div className="absolute top-0 h-1/2 w-full bg-WebsiteHeaderGradientV1"></div>
        <div className="absolute -bottom-5 left-4 flex flex-col items-center gap-8 xl:left-10">
          <ScrollDownAnimationIcon />
          <p className="min-h-24 w-[1px] bg-white xl:min-h-40"></p>
        </div>
        <Container classNames="flex flex-wrap justify-center gap-20 xl:gap-0 overflow-hidden">
          <div className="w-full lg:w-1/2">
            <h1
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              className="relative z-10 mb-10 max-w-max text-5xl font-bold md:text-7xl xl:text-8xl xlCustom:text-9xl"
            >
              FREE TRIAL
              <DiagonalCutLine
                classNames="absolute bottom-0 xl:bottom-3 ml-5 left-0 -z-10 h-4 md:h-9 xl:h-[37px] w-[60%]"
                color="#21dfff"
              />
            </h1>
            <Button
              animationDuration="2000"
              animationName="fade-left"
              animationDelay="900"
              classNames="xl:ml-12"
              type="primary"
              to="/signup"
            >
              Create a free account now
            </Button>
            <h4
              className="relative z-10 ml-12 mt-5 max-w-max text-2xl font-semibold xl:ml-24"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              YOU WILL LOVE IT!
              <DiagonalCutLine
                classNames="absolute bottom-0 ml-5 -left-5 -z-10 w-[60%] h-[10px]"
                color="#21dfff"
              />
            </h4>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="500"
            id="hero-img"
            className="w-full lg:w-1/2"
          >
            <img
              // fetchPriority="high"
              // decoding="async"
              width="1500"
              height="710"
              src="/assets/img/website/home/all-devices-white (2).png"
              alt=""
            />
          </div>
        </Container>
      </section>

      {/* 02) FEATURE */}
      <section className="relative z-10 overflow-hidden bg-[url('/assets/img/website/home/data-bg.jpg')] bg-cover pb-12 pt-12 text-white lg:pb-28">
        <div className="absolute bottom-0 left-0 -z-10 hidden xl:block">
          <img
            loading="lazy"
            decoding="async"
            width="639"
            height="442"
            src="/assets/img/website/home/2nd-section-image-2-min.png"
            alt="Football Data"
            srcSet="/assets/img/website/home/2nd-section-image-2-min.png 639w, /assets/img/website/home/2nd-section-image-2-min-300x208.png 300w"
            sizes="(max-width: 639px) 100vw, 639px"
          />
        </div>
        <div className="mx-auto flex max-w-[1560px] flex-col items-center justify-between gap-10 px-4 xl:flex-row">
          <div className="grid w-full gap-6 p-4 text-center text-accent md:grid-cols-2 lg:w-1/2">
            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <h4 className="bg-secondary px-6 py-10 text-2xl md:px-[35px] md:py-[90px] md:text-4xl">
                THE WORLD'S ULTIMATE FOOTBALL DATA ENGINE
              </h4>
            </div>
            <div
              className="flex items-end"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="600"
            >
              <h4 className="bg-secondary px-6 py-10 text-lg md:max-w-[252px] md:px-[35px] md:py-[65px]  md:text-2xl">
                THE MOST POWERFUL SPORTING ALGORITHM EVER CREATED
              </h4>
            </div>
            <div
              className="flex items-start justify-end"
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="900"
            >
              <h4 className="bg-secondary px-6 py-10 text-lg md:max-w-[252px] md:px-[35px] md:py-[65px]  md:text-2xl">
                CUTTING EDGE FOOTBALLING STATISTICAL METHODOLOGY
              </h4>
            </div>

            <div
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="1200"
            >
              <h4 className="bg-primary px-6 py-10 text-2xl font-semibold text-white md:px-[35px] md:py-[90px] md:text-4xl">
                COVERING 1000+ LEAGUES, CUPS & PLAYERS IN 140+ COUNTRIES
              </h4>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <SectionHeader
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="2000"
              className="md:left- left-2 mb-4 max-w-max text-[40px] md:max-w-[560px] md:text-[65px] xl:mb-20 xl:ml-auto xl:text-end xl:text-[95px]"
            >
              Sports Trading Ai Predictions
              <DiagonalCutLine
                classNames="absolute left-4 md:left-[unset] md:ml-5 md:right-0 top-8 md:top-12 -z-10 h-5 xl:h-[37px] w-[60%]"
                direction="right"
                color="#21dfff"
              />
            </SectionHeader>
            <p
              className="max-w-[420px] text-lg uppercase xl:ml-auto"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="900"
            >
              Fully automated, 24 hours a day, 365 days a year, without a doubt,
              the most impressive football data engine on the planet.
            </p>
          </div>
        </div>
      </section>
      {/* 03) FEATURE */}
      <section className="relative z-10 bg-[url('/assets/img/website/home/Group-97471-min.png')] bg-cover py-16 text-white xl:py-32">
        <div className="absolute inset-0 bg-[#001B36] opacity-70 mix-blend-multiply"></div>
        <div className="absolute bottom-0 h-[35%] w-full bg-WebsiteHeaderGradientV2"></div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="absolute left-0 top-[200px] hidden lg:block"
        >
          <img
            loading="lazy"
            decoding="async"
            src="/assets/img/website/home/smartmockups_lslhr3ey.png"
          />
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="absolute -top-10 right-0 overflow-hidden md:-top-[100px]"
        >
          <img
            loading="lazy"
            decoding="async"
            width="844"
            height="981"
            src="/assets/img/website/home/Football-player-illustration-min.png"
            className="relative -right-[40%] max-w-[280px] md:max-w-[480px] lg:right-[unset] xl:max-w-[650px]"
            alt="Football Algorithm"
            srcSet="/assets/img/website/home/Football-player-illustration-min.png 844w, /assets/img/website/home/Football-player-illustration-min-258x300.png 258w, /assets/img/website/home/Football-player-illustration-min-768x893.png 768w"
            sizes="(max-width: 844px) 100vw, 844px"
          />
        </div>
        <div className="relative mx-auto px-4 lg:max-w-[500px]">
          <SectionHeader
            data-aos="fade-left"
            data-aos-duration="1500"
            className="mb-5 max-w-[320px] text-[40px] uppercase md:mb-20 md:max-w-[360px] md:text-[80px] xl:mx-auto xl:max-w-[unset]"
          >
            Cutting-edge player statistics
            <DiagonalCutLine
              classNames="absolute left-3 top-6 md:top-12 -z-10 h-5 xl:h-[37px] w-[40%] md:w-[60%]"
              direction="left"
              color="#e61b3d"
            />
          </SectionHeader>
          <p
            className="max-w-[420px] text-lg"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            Elevate your soccer game with analytics that propel you to the next
            level. It's like having your personal team of football performance
            analysts right at your fingertips.
          </p>
        </div>
      </section>
      {/* 04) WHY US */}
      <section
        id="whyUs"
        className="relative z-10 overflow-hidden bg-[url('/assets/img/website/home/whybg-min.png')] bg-contain bg-left-top bg-no-repeat	pb-0 pt-16 text-white after:absolute after:right-0 after:top-0 after:hidden after:h-full after:w-4/12 after:bg-primary after:content-[''] lg:pb-16 lg:after:inline-block"
      >
        {/* Element rotating on scroll for DESKTOP */}
        <div
          ref={parllax.ref}
          className="absolute -left-28 bottom-0 z-[11] hidden bg-center  bg-no-repeat lg:block lg:bg-[url('/assets/img/website/home/Group-97459-min.png')]"
        >
          <img
            loading="lazy"
            decoding="async"
            width="427"
            height="427"
            src="/assets/img/website/home/2nd-Circle-Text-min.png"
            className="hidden max-w-[250px] lg:block lg:max-w-[350px]"
            alt="European football Data"
            srcSet="/assets/img/website/home/2nd-Circle-Text-min.png 427w, /assets/img/website/home/2nd-Circle-Text-min-300x300.png 300w, /assets/img/website/home/2nd-Circle-Text-min-150x150.png 150w"
            sizes="(max-width: 427px) 100vw, 427px"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-[1300px] flex-col items-center justify-between lg:flex-row">
          <div data-aos="zoom-in" data-aos-duration="1000" className="lg:w-1/2">
            <img
              loading="lazy"
              decoding="async"
              width="1500"
              height="1500"
              src="/assets/img/website/home/Untitled_design-removebg-preview.png"
              className="ml-auto max-h-[891px] max-w-[230px] sm:max-w-[380px] xl:max-w-[480px]"
              alt=""
              // srcSet="/assets/img/website/home/euro-football-data-why-us-correct-ai-predictions-reversed-2-1.png 1500w, /assets/img/website/home/euro-football-data-why-us-correct-ai-predictions-reversed-2-1-300x300.png 300w, /assets/img/website/home/euro-football-data-why-us-correct-ai-predictions-reversed-2-1-1024x1024.png 1024w, /assets/img/website/home/euro-football-data-why-us-correct-ai-predictions-reversed-2-1-150x150.png 150w, /assets/img/website/home/euro-football-data-why-us-correct-ai-predictions-reversed-2-1-768x768.png 768w"
              // sizes="(max-width: 1500px) 100vw, 1500px"
            />
          </div>
          <div className="relative bg-primary px-[10%] py-20 lg:w-[40%] lg:bg-transparent lg:p-[unset] lg:py-5">
            {/* Element rotating on scroll for MOBILE */}
            <div
              ref={mobileParllax.ref}
              className="absolute -left-36 -top-20 z-[11] bg-center bg-no-repeat  lg:hidden  lg:bg-[url('/assets/img/website/home/Group-97459-min.png')]"
            >
              <img
                loading="lazy"
                decoding="async"
                width="427"
                height="427"
                src="/assets/img/website/home/1st-Circle-Text-hyphen.png"
                className="max-w-[250px] lg:max-w-[350px]"
                alt="European football Data"
              />
            </div>
            <SectionHeader
              data-aos="fade-left"
              data-aos-duration="1500"
              className="relative z-10 mb-5 ml-auto max-w-xs text-center text-[40px] font-bold md:text-[95px] lg:mx-auto"
            >
              WHY <br /> US?
              <DiagonalCutLine
                classNames="absolute xl:bottom-5 ml-5 w-1/2 mx-auto left-1/2 transform -translate-x-1/2 top-12 xl:top-10 -z-10 xl:h-[37px] h-5"
                color="#21dfff"
                direction="right"
              />
            </SectionHeader>
            <div data-aos="fade-up" data-aos-duration="1500">
              <p className="mb-5">
                We've developed the world's most precise and feature-rich
                football analytical and prediction web application.
              </p>
              <p className="mb-5">
                This exceptional, state-of-the-art program is fully automated,
                user-friendly, and covers over 95% of the daily football games
                worldwide. It provides comprehensive data and statistics for
                both teams and players.
              </p>
              <p className="mb-5">
                With a simple click, every detail of each match—statistics,
                league positions, scored goals, corners, team forms, and more—is
                instantly available.
              </p>
              <p className="mb-5">
                Our advanced predictive algorithm conducts in-depth analysis and
                predictions, proven to elevate results for even the most
                experienced sports traders.
              </p>
              <p>
                No more hours spent on data research; now, you have more time to
                analyze, strategize, and effectively leverage the data for
                performance insights that significantly enhance results.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 05) CTA */}
      <section className="bg-[url('/assets/img/website/home/Footer-background-illustration2-min.png')] bg-cover bg-no-repeat pb-20 pt-20 text-white lg:pt-40">
        <div className="mx-auto flex max-w-[1560px] flex-col items-center justify-center gap-12 px-4 lg:flex-row lg:gap-20">
          <div className="lg:w-1/2">
            <div className="mb-12">
              <img
                loading="lazy"
                decoding="async"
                className="max-w-[250px]"
                src="/assets/img/logo.png"
                alt="Sports Trading Ai Predictions"
              />
            </div>
            <div className="max-w-[525px] text-lg">
              <p className="mb-4 max-w-[525px] text-lg uppercase">
                We are prepared to guide you into the next era of online sports
                data, providing worldwide access to our state-of-the-art web
                application 24/7, accessible with just a click.
              </p>
              <p className="uppercase">
                Explore the future of sports trading with our cutting-edge AI
                predictions – the ultimate web application for football data.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <SectionHeader className="mb-2 max-w-[200px] text-[40px] lg:text-[60px] lg:!leading-[58px]">
              SOUNDS GOOD?
              <DiagonalCutLine
                classNames="absolute bottom-5 ml-5 -left-3 top-6 -z-10 h-[26px] w-[57%]"
                color="#e61b3d"
              />
            </SectionHeader>
            <p className="mb-7 text-lg">
              Register your interest to hear from us first about specials, sales
              and events.
            </p>
            <div>
              <form className="flex flex-col flex-wrap justify-between gap-5 lg:flex-row lg:gap-10">
                <input
                  className="flex-grow bg-[#ffffff59] p-4 font-medium"
                  placeholder="Email"
                  type="email"
                />
                <button className="max-w-max bg-primary px-10 py-4 text-lg">
                  Register now
                </button>
              </form>
            </div>
            <div className="mb-7 mt-12 flex items-center gap-6">
              <span className="border-b-[1px] border-primary text-lg font-bold uppercase">
                Contact:
              </span>
              <a href="mailto:mailto:postmaster@sports-trading-ai-predictions.com">
              postmaster@sports-trading-ai-predictions.com
              </a>
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
        </div>
      </section>
    </main>
  );
}

export default Home;
